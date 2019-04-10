import React, { Component } from 'react';
import './login.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './action';

import { toast } from '../../../common/utils/toast';    // 全局提示

class Login extends Component {
    constructor () {
        super();

        this.state = {
            account: '',        // 账号
            password: '',       // 密码
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
        if (value == 'account') {
            this.setState({
                account: this.refs.account.value
            });
        } else {
            this.setState({
                password: this.refs.password.value
            });
        }
    }

    /**
     * 完成登录操作。
     * @author Tinybo
     * @date 2019 04 10
     */
    login = () => {
        console.log(this.state);
        if (this.state.account == '' || this.state.password == '') {
            toast('warning', '账号或密码不能为空。');
            return;
        }

        this.isLogin = true;
        this.logging();
        // 3秒后结束登录状态
        setTimeout(() => {
            clearTimeout(this.state.result);
            this.isLogin = false;
            this.setState({ canPress: false });
        }, 3000);
    }

    /**
     * 登录时，改变登录按钮的状态。
     * @author Tinybo
     * @date 2019 04 10
     */
    logging = (num = 0) => {
        this.setState({ canPress: true });
        let text = {
            0: '登录中.',
            1: '登录中..',
            2: '登录中...'
        }
        let result = setTimeout(() => {
            if (num == 3) num = 0;
            this.setState({
                loginBtnText: text[num++],
            });
            if (this.isLogin) {
                this.logging(num);      // 进入下一次循环
            } else {
                clearTimeout(result);   // 清除计时器
                this.setState({ loginBtnText: '登 录' });
            }
        }, 700);
    }

    render () {
        return (
            <div className="loginContainer animated zoomInUp">
                <input type="text" ref="account" className="account" placeholder="学号 / 手机号" defaultValue={ this.state.account } onChange={ this.saveValue.bind(this, 'account') } />
                <input type="text" ref="password" className="password" placeholder="密码" defaultValue={ this.state.password } onChange={ this.saveValue.bind(this, 'password') } />

                <button className="loginBtn" onClick={ this.login } disabled={ this.state.canPress } >{ this.state.loginBtnText }</button>
                <span onClick={() => { this.props.shiftPage('register') }}>去注册</span>
            </div>
        )
    }
}

export default connect(
    (state) => state,
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(Login);