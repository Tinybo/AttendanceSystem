import React, { Component } from 'react';
import './courseCard.scss';
import { dateFormat } from '../../common/utils/dateFormat';

/**
 * 课堂卡片。
 * @author Tinybo
 * @date 2019 04 20
 */
class CourseCard extends Component {
    constructor () {
        super();
    }

    render () {
        const { data, iconImg, onClick, buttonText, buttonCallback } = this.props;
        let oriColor = {
            0: '#2d8cf0',
            1: '#c5c8ce',
            2: '#ed4014',
            3: '#c5c8ce'
        };

        return (
            <div className="attendCardContainer" style={{ border: '2px solid ' + oriColor[data.isFinish] }}>
                <div className="top">
                    <span onClick={ onClick }>{ data.name }</span>
                    {
                        (buttonText && data.isFinish == 0) ?
                        (
                            <button onClick={() => { buttonCallback(data.userId, data.id) }}>{ buttonText }</button>
                        ) : 
                        (
                            <img src={ iconImg } alt="logo" width="50" height="50" />
                        )
                    }
                </div>
                <div className="bottom" onClick={ onClick }>
                    <span className="text">课程ID：{ data.id }</span>
                    <span className="text">教师工号：{ data.num }</span>
                    <span className="text">任课老师：{ data.tea_name }</span>
                    <span className="text">上课地点：{ data.address }</span> 
                </div>
                <span className="time" onClick={ onClick }>{ dateFormat(data.createTime) }</span>
            </div>
        )
    }
}

export default CourseCard;