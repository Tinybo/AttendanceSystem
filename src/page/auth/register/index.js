import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import './register.scss';
import { Menu, Dropdown, Button, Icon, message } from 'antd';
import {toast} from '../../../common/utils/toast'; // 全局提示
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';

class Register extends Component {
    constructor () {
        super();
        
        this.state = {
            account: '',
            password: '',
            rePassword: '',
            userType: '选择用户类型',
            canPress: false,
            registerBtnText: '注 册'
        }

        this.isRegister = false;
    }

    /**
     * 选择注册的用户类型。
     * @author Tinybo
     * @date 2019 04 10
     */
    chooseType = (type) => {
        const users = {
            '1': '学生',
            '2': '教师',
            '3': '学工办',
            '4': '学院领导'
        };

        this.setState({
            userType: users[type.key]
        })
    }

    /**
     * 保存表单。
     * @author Tinybo
     * @date 2019 04 11
     */
    saveValue = (value, e) => {
        switch (value) {
            case 'account': this.setState({ account: this.refs.account.value }); break;
            case 'password': this.setState({ password: this.refs.password.value }); break;
            case 'rePassword': this.setState({ rePassword: this.refs.rePassword.value }); break;
            default: break;
        }
    }

    /**
     * 完成注册操作。
     * @author Tinybo
     * @date 2019 04 11
     */
    register =  () => {
        const { actions } = this.props;

        // 校验表单数据合法性
        if (this.state.account === '' || this.state.password === '' || this.state.rePassword === '' || this.state.userType === '选择用户类型') {
            toast('warning', '请先完整信息再注册！');
            return;
        }
        // 判断两次输入的密码是否一致
        if (this.state.password !== this.state.rePassword) {
            toast('warning', '两次输入的密码不一致！');
            return;
        }

        // 处理用户类型
        let tempType = {
            '学生': 1,
            '教师': 2,
            '学工办': 3,
            '学院领导': 4
        }

        this.logging(); // 设置登录状态
        console.log(browserHistory);

        // 正式进入登录操作
        actions.register({
            phone: this.state.account,
            password: this.state.password,
            type: tempType[this.state.userType]
        });
    }

    /**
     * 登录时，改变登录按钮的状态。
     * @author Tinybo
     * @date 2019 04 10
     */
    logging = (num = 0) => {
        let { isRegisterFinish } = this.props.login;
        const { actions } = this.props;

        this.setState({canPress: true});
        let text = {
            0: '注册中.',
            1: '注册中..',
            2: '注册中...'
        }
        let result = setTimeout(() => {
            if (num == 3) 
                num = 0;
            this.setState({
                registerBtnText: text[num++]
            });
            if (this.isRegister && !isRegisterFinish) {
                this.logging(num);          // 进入下一次循环
            } else {
                this.isRegister = false;    // 还原登录按钮
                actions.resetBtn();         // 还原登录按钮
                clearTimeout(result);       // 清除计时器

                this.setState({
                    registerBtnText: '注 册',
                    canPress: false
                });

                // 跳转至登录界面
                this.props.shiftPage('login');
                console.log('注册终于结束了。');

                // 登录结果提示信息
                /* const { phone, stu_name } = this.props.register;
                if (phone) {
                    toast('success', '欢迎回来！');
                } else {
                    toast('error', '该账户不存在！');
                } */
            }
        }, 100);
    }

    render () {
        const userType = (
            <Menu onClick={ this.chooseType }>
              <Menu.Item key="1"><Icon type="user" />学生</Menu.Item>
              <Menu.Item key="2"><Icon type="user" />教师</Menu.Item>
              <Menu.Item key="3"><Icon type="user" />学工办</Menu.Item>
              <Menu.Item key="4"><Icon type="user" />学院领导</Menu.Item>
            </Menu>
        );

        return (
            <div className="registerContainer animated jackInTheBox">
                <Dropdown overlay={ userType }>
                    <Button className="chooseBtn">
                        <span className="text">{ this.state.userType }</span>
                        <Icon className="icon" type="down" />
                    </Button>
                </Dropdown>
                <input type="text" ref="account" className="account" placeholder="手机号" defaultValue={ this.state.account } onChange={ this.saveValue.bind(this, 'account') } />
                <input type="text" ref="password" className="password" placeholder="密码" defaultValue={ this.state.password } onChange={ this.saveValue.bind(this, 'password') } />
                <input type="text" ref="rePassword" className="password" placeholder="确认密码" defaultValue={ this.state. rePassword } onChange={ this.saveValue.bind(this, 'rePassword') } />

                <button className="registerBtn" 
                    onClick={ this.register }
                    disabled={this.state.canPress}>
                    {this.state.registerBtnText}
                </button>
                <span className="changeBtn" onClick={() => { this.props.shiftPage('login') }}>去登录</span>
            </div>
        )
    }
}

export default connect(
    (state) => state, 
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(Register);