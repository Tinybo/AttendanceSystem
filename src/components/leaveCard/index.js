import React, { Component } from 'react';
import './leaveCard.scss';
import { dateFormat } from '../../common/utils/dateFormat';

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
        const { data, iconImg, onClick, buttonText, buttonCallback } = this.props;
        let oriColor = {
            0: '#2d8cf0',
            1: '#19be6b',
            2: '#ed4014',
            3: '#c5c8ce'
        };

        return (
            <div className="leaveCardContainer" style={{ border: '2px solid ' + oriColor[data.isSuccess] }} >
                <div className="top">
                    <span onClick={ onClick }>{ data.name } 的请假</span>
                    {
                        (buttonText && data.isSuccess == 0) ?
                        (
                            <button onClick={() => { buttonCallback(data.userId, data.id) }}>{ buttonText }</button>
                        ) : 
                        (
                            <img src={ iconImg } alt="logo" width="50" height="50" />
                        )
                    }
                </div>
                <div className="middle" onClick={ onClick }>
                    <span className="label">请假事由：</span>
                    <div className="text">{ data.reason }</div>
                </div>
                <div className="bottom" onClick={ onClick }>
                    <span className="text">开始时间：{ dateFormat(data.startTime) }</span>
                    <span className="text">结束时间：{ dateFormat(data.endTime) }</span>
                </div>
                <span className="time" onClick={ onClick }>{ data.createTime }</span>
            </div>
        )
    }
}

export default LeaveCard;