import React, { Component } from 'react';
import './register.scss';
import { Menu, Dropdown, Button, Icon, message } from 'antd';

class Register extends Component {
    constructor () {
        super();
        
        this.state = {
            account: '',
            password: '',
            rePassword: '',
            userType: '选择用户类型'
        }
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
            <div className="registerContainer animated zoomInDown">
                <Dropdown overlay={ userType }>
                    <Button className="chooseBtn">
                        <span className="text">{ this.state.userType }</span>
                        <Icon className="icon" type="down" />
                    </Button>
                </Dropdown>
                <input type="text" className="account" placeholder="学号 / 手机号" defaultValue={ this.state.account } />
                <input type="text" className="password" placeholder="密码" defaultValue={ this.state.password } />
                <input type="text" className="password" placeholder="确认密码" defaultValue={ this.state. rePassword } />

                <button className="registerBtn">注 册</button>
                <span className="changeBtn" onClick={() => { this.props.shiftPage('login') }}>去登录</span>
            </div>
        )
    }
}

export default Register;