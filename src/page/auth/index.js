import React, { Component } from 'react';
import './auth.scss';
import Login from './login';
import Register from './register';
import { Spin, Alert } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/auth';

/**
 * 登录·注册页面。
 * @author Tinybo
 * @date 2018 12 11
 */
class Auth extends Component {
    constructor () {
        super();
        
        this.state = {
            loginOrRegister: 'login',
        }
    }

    /**
     * 渲染登录/注册界面。
     * @author Tinybo
     * @date 2019 04 10
     */
    renderMain = () => {
        if (this.state.loginOrRegister === 'login') {
            return <Login shiftPage={ this.shiftPage } />
        }
        return <Register className="animated fadeInRight" shiftPage={ this.shiftPage } />
    }

    /**
     * 切换登录/注册页面。
     * @author Tinybo
     * @date 2019 04 10
     */
    shiftPage = (address) => {
        this.setState({
            loginOrRegister: address
        });
    }

    render () {
        return (
            <div className="authContainer">
                <div className="animated fadeIn background">
                    <img src={require("../../common/images/campus.jpg")} alt="logo"/>
                </div>
                <header>
                    <div className="logo">
                        <img className="animated fadeInDown" src={require("../../common/images/logo.png")} alt="logo" width="60" height="60" />
                    </div>
                    <div className="brandContainer">
                        <span className="animated fadeInUp">校 园</span>
                        <span><img src={require("../../common/images/dot.png")} alt="logo" width="20" height="20" /></span>
                        <span className="animated fadeInUp">考 勤</span>
                    </div>
                </header>

                <main>
                    { this.renderMain() }
                </main>
            </div>
        )
    }
}

export default connect(
    (state) => state.name,
    (dispatch) => ({
        actions: bindActionCreators(authActions, dispatch)
    })
)(Auth);