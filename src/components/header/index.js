import React, { Component } from 'react';
import './header.scss';
import { Icon } from 'antd';
import Back from '../back';


/**
 * 模版组件。
 * @author Tinybo
 * @date 2018 12 11
 */
class Header extends Component {
    constructor () {
        super();
    }

    render () {
        const { callback } = this.props;

        return (
            <div className="headerContainer">
                <div className="brand">
                    <img className="animated fadeInLeft" src={require("../../common/images/logo.png")} alt="logo" width="35" height="35" />
                    <span className="animated fadeInRight">考勤 · 系统</span>
                </div>
                <div className="setting">
                    <Back text="注销" icon="logout" textColor="white" textBold="bold" callback={ callback } />
                </div>
            </div>
        )
    }
}

export default Header;