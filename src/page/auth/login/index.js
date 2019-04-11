import React, {Component} from 'react';
import './login.scss';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';

import {toast} from '../../../common/utils/toast'; // 全局提示

class Login extends Component {
    constructor() {
        super();

        this.state = {
            account: '', // 账号
            password: '', // 密码
            loginBtnText: '登 录',
            canPress: false
        }

        this.isLogin = false;
    }

    /**
     * 保存表单。
     * @author Tinybo
     * @date 2019 04 10
     */
    saveValue = (value, e) => {
        if (value === 'account') {
            this.setState({account: this.refs.account.value});
        } else {
            this.setState({password: this.refs.password.value});
        }
    }

    /**
     * 完成登录操作。
     * @author Tinybo
     * @date 2019 04 10
     */
    login = () => {
        const { actions } = this.props;

        // 校验表单数据合法性
        if (this.state.account === '' || this.state.password === '') {
            toast('warning', '账号或密码不能为空。');
            return;
        }

        this.isLogin = true;
        this.logging(); // 设置登录状态

        // 正式进入登录操作
        actions.login({
            phone: this.state.account,
            password: this.state.password
        });

        // 显示登录提示信息
        console.log(this.props.login);
        
    }

    /**
     * 登录时，改变登录按钮的状态。
     * @author Tinybo
     * @date 2019 04 10
     */
    logging = (num = 0) => {
        let { isLoginFinish } = this.props.login;
        const { actions } = this.props;

        this.setState({canPress: true});
        let text = {
            0: '登录中.',
            1: '登录中..',
            2: '登录中...'
        }
        let result = setTimeout(() => {
            if (num == 3) 
                num = 0;
            this.setState({
                loginBtnText: text[num++]
            });
            if (this.isLogin && !isLoginFinish) {
                this.logging(num); // 进入下一次循环
            } else {
                this.isLogin = false; // 还原登录按钮
                actions.resetBtn();   // 还原登录按钮
                clearTimeout(result); // 清除计时器

                this.setState({
                    loginBtnText: '登 录',
                    canPress: false
                });

                // 登录结果提示信息
                const { phone, stu_name } = this.props.login;
                if (phone) {
                    toast('success', '欢迎回来！');
                } else {
                    toast('error', '该账户不存在！');
                }
            }
        }, 700);
    }

    render() {
        return (
            <div className="loginContainer animated jackInTheBox">
                <input
                    type="text"
                    ref="account"
                    className="account"
                    placeholder="学号 / 手机号"
                    defaultValue={this.state.account}
                    onChange={this
                    .saveValue
                    .bind(this, 'account')}/>
                <input
                    type="text"
                    ref="password"
                    className="password"
                    placeholder="密码"
                    defaultValue={this.state.password}
                    onChange={this
                    .saveValue
                    .bind(this, 'password')}/>

                <button
                    className="loginBtn"
                    onClick={this.login}
                    disabled={this.state.canPress}>{this.state.loginBtnText}</button>
                <span
                    onClick={() => {
                    this
                        .props
                        .shiftPage('register')
                }}>去注册</span>
            </div>
        )
    }
}

export default connect((state) => state, (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
}))(Login);