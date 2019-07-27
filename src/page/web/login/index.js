import React, { Component } from 'react';
import './login.scss';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../auth/login/action';
import * as actionsMiddle from '../../home/middle/action';

import { hashHistory } from 'react-router';
import { Icon, Select } from 'antd';

import { toast } from '../../../common/utils/toast';

const Option = Select.Option;

/**
 * Web端的登录页面。
 * @author Tinybo
 * @date 2019 04 30
 */
class Login extends Component {
    constructor () {
        super();

        this.state = {
            account: '333',        // 账号
            password: '333',       // 密码
            loginBtnText: '登 录',
        }
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
     * 注销程序。
     * @author Tinybo
     * @date 2019 04 13
     */
    logout = () => {
        // 清空所有用户信息
        localStorage.clear();

        const { actionsMiddle, actionsMiddleAdmin } = this.props;
        actionsMiddle.emptyData();
        actionsMiddleAdmin.emptyData();

        toast('success', '注销成功！');
        console.log('已经退出了。');
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
            toast('warning', '账号或密码不能为空！');
            return;
        }

        // 正式进入登录操作
        actions.login({
            type: 3,
            phone: this.state.account,
            password: this.state.password,
            operation: 1
        });
    }

    render () {
        const { isAdmin } = this.props.login;

        return (
            <div className="webLoginContainer">
                <div className="card" style={{ display: isAdmin ? 'none' : 'flex' }}>
                    <div className="label animated fadeInDown">
                        <h2>登 录</h2>
                    </div>
                    <input
                        type="text"
                        ref="account"
                        className="account"
                        placeholder="手机号"
                        defaultValue={this.state.account}
                        onChange={this
                        .saveValue
                        .bind(this, 'account')}/>
                    <input
                        type="password"
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
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => state, 
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch),
    })
)(Login);