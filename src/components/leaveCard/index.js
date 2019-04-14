import React, { Component } from 'react';
import './leaveCard.scss';
import { Icon } from 'antd';
import { hashHistory } from 'react-router';

/**
 * 请假记录的卡片。
 * @author Tinybo
 * @date 2019 04 14
 */
class LeaveCard extends Component {
    constructor () {
        super();
    }

    render () {
        const { data } = this.props;
        let oriColor = {
            0: '#2d8cf0',
            1: '#19be6b',
            2: '#ed4014'
        };

        return (
            <div className="leaveCardContainer" style={{ border: '2px solid ' + oriColor[data.status] }} >
                <div className="top">
                    <span>张宇的请假</span>
                    <img src={ data.urlImg } alt="logo" width="50" height="50" />
                </div>
                <div className="middle">
                    <span className="label">请假事由：</span>
                    <span className="text">由于身体不舒服，想去大医院做一个全面的检查。</span>
                </div>
                <div className="bottom">
                    <span className="text">开始时间：2019-03-18 上午</span>
                    <span className="text">结束时间：2019-03-18 下午</span>
                </div>
                <span className="time">2019-03-17</span>
            </div>
        )
    }
}

export default LeaveCard;