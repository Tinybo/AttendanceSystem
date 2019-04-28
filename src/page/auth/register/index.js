import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import './register.scss';
import {  Button, Icon, Select } from 'antd';
import {toast} from '../../../common/utils/toast'; // 全局提示
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';

const Option = Select.Option;

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
     * 设置用户类型。
     * @author Tinybo
     * @date 2019 04 12
     */
    handleChange = (value) => {
        this.setState({
            userType: value
        });
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

        this.logging(); // 设置注册状态

        // 正式进入登录操作
        actions.register({
            phone: this.state.account,
            password: this.state.password,
            type: this.state.userType
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

                // 登录结果提示信息
                const { phone, stu_name } = this.props.register;
                if (phone) {
                    // 跳转至登录界面
                    // this.props.shiftPage('login');
                    console.log('注册终于结束了。');
                }
            }
        }, 100);
    }

    render () {
        return (
            <div className="registerContainer animated jackInTheBox">
                <Select
                    placeholder="用户类型"
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="1">学生</Option>
                    <Option value="2">教师</Option>
                    <Option value="3">学工办</Option>
                    <Option value="4">学院领导</Option>
                </Select>
                <input type="text" ref="account" className="account" placeholder="手机号" defaultValue={ this.state.account } onChange={ this.saveValue.bind(this, 'account') } />
                <input type="password" ref="password" className="password" placeholder="密码" defaultValue={ this.state.password } onChange={ this.saveValue.bind(this, 'password') } />
                <input type="password" ref="rePassword" className="password" placeholder="确认密码" defaultValue={ this.state. rePassword } onChange={ this.saveValue.bind(this, 'rePassword') } />

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