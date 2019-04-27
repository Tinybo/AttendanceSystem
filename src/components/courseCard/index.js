import React, { Component } from 'react';
import './courseCard.scss';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';

import { dateFormat } from '../../common/utils/dateFormat';
import Success from '../../common/images/hasArrived.png'
import Late from '../../common/images/late.png';
import Truancy from '../../common/images/truancy.png';
import Leave from '../../common/images/leaveText.png';
import Early from '../../common/images/early.png';
import Attending from '../../common/images/attending.png';
import Ending from '../../common/images/ending.png';

/**
 * 课堂卡片。
 * @author Tinybo
 * @date 2019 04 20
 */
class CourseCard extends Component {
    constructor () {
        super();
    }

    componentWillMount () {
        const { actions, data } = this.props;
        let userId = localStorage.getItem('userId');
        let type = localStorage.getItem('type');

        if (type == 1) {
            // 获取学生的到课信息
            actions.getCourseInfo({
                course_id: data.id,
                stu_id: userId
            });
        }  
    }

    // 清空历史数据
    componentWillUnmount () {
        const { actions } = this.props;

        actions.emptyData();
    }

    render () {
        const { data, iconImg, onClick, buttonText, buttonCallback } = this.props;
        const { courseData } = this.props.courseCard;

        console.log('我的到课数据：', courseData);

        let oriColor = {
            0: '#2d8cf0',
            1: '#c5c8ce',
            2: '#ed4014',
            3: '#c5c8ce'
        };

        let imgUrl = {
            1: Success,
            2: Leave,
            3: Late,
            4: Early,
            5: Truancy
        }

        let imgUrl2 = {
            0: Attending,
            1: Ending
        }

        let imgUrlAddress = '';
        if (courseData.status) {
            console.log('进来了');
            imgUrlAddress = imgUrl[courseData.status];
        } else {
            imgUrlAddress = imgUrl2[data.isFinish];
        }

        let status = courseData.status || data.isFinish;

        return (
            <div className="attendCardContainer" style={{ border: '2px solid ' + oriColor[data.isFinish] }}>
                <div className="top">
                    <span onClick={ onClick }>{ data.name }</span>
                    {
                        (buttonText && status == 0) ?
                        (
                            <button onClick={() => { buttonCallback(data.userId, data.id) }}>{ buttonText }</button>
                        ) : 
                        (
                            <img src={ imgUrlAddress } alt="logo" width="50" height="50" />
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

export default connect(
    (state) => state, 
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(CourseCard);