import React, { Component } from 'react';
import './courseInfo.scss';
import { dateFormat } from '../../common/utils/dateFormat';

/**
 * 课堂信息组件。
 * @author Tinybo
 * @date 2019 04 14
 */
class CourseInfo extends Component {
    constructor () {
        super();
    }

    render () {
        const { data } = this.props;

        return (
            <div className="courseInfoContainer">
                <div className="item">
                    <span className="label">课堂名：</span>
                    <span className="content">{ data.name }</span>
                </div>
                <div className="item">
                    <span className="label">课程ID：</span>
                    <span className="content">{ data.id }</span>
                </div>
                <div className="item">
                    <span className="label">任课老师：</span>
                    <span className="content">{ data.tea_name }</span>
                </div>
                <div className="item">
                    <span className="label">上课地点：</span>
                    <span className="content">{ data.address }</span>
                </div>
                <div className="item">
                    <span className="label">创建时间：</span>
                    <span className="content">{ dateFormat(data.createTime) }</span>
                </div>
            </div>
        )
    }
}

export default CourseInfo;