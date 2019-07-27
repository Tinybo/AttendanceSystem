import React, { Component } from 'react';
import './webHeader.scss';
import { Icon } from 'antd';
import Back from '../back';


/**
 * Web端的头部组件。
 * @author Tinybo
 * @date 2019 04 29
 */
class WebHeader extends Component {
    constructor () {
        super();
    }

    render () {
        const { callback, btnText, icon } = this.props;

        return (
            <div className="webHeaderContainer">
                <div className="brand">
                    <img className="animated fadeInLeft" src={require("../../common/images/logo.png")} alt="logo" width="35" height="35" />
                    <span className="animated fadeInRight">考勤 · 系统</span>
                </div>
                
            </div>
        )
    }
}

export default WebHeader;

/* <div className="setting">
    <Back text="注销" icon="logout" textColor="white" textBold="bold" callback={ callback } />
</div> */