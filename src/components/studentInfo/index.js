import React, { Component } from 'react';
import './studentInfo.scss';
import { dateFormat } from '../../common/utils/dateFormat';

import { Select } from 'antd';

const Option = Select.Option;

/**
 * 学生信息组件。
 * @author Tinybo
 * @date 2019 04 14
 */
class StudentInfo extends Component {
    constructor () {
        super();

        this.state = {
            department: '计算机与电气工程学院',
            major: '网络工程', 
            grade: '15',
            Class: '2'
        }
    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    render () {
        const { data } = this.props;

        return (
            <div className="studentInfoContainer">
                <div className="chooseInfo">
                    <Select defaultValue={ this.state.department } onChange={ this.handleChange }>
                        <Option value="计算机与电气工程学院">计算机与电气工程学院</Option>
                        <Option value="生命与环境科学学院">生命与环境科学学院</Option>
                    </Select>
                    <Select defaultValue={ this.state.major } onChange={ this.handleChange }>
                        <Option value="网络工程">网络工程</Option>
                        <Option value="农学">农学</Option>
                    </Select>
                    <Select defaultValue={ this.state.grade } onChange={ this.handleChange }>
                        <Option value="15">15</Option>
                        <Option value="16">16</Option>
                    </Select>
                    <Select defaultValue={ this.state.Class } onChange={ this.handleChange }>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                    </Select>

                    <div className="status">
                        <div className="item">
                            <span className="label">应到人数：</span>
                            <span className="content">9</span>
                        </div>
                        <div className="item">
                            <span className="label">实到人数：</span>
                            <span className="content">9</span>
                        </div>
                        <div className="item">
                            <span className="label">请假人数：</span>
                            <span className="content">9</span>
                        </div>
                        <div className="item">
                            <span className="label">迟到人数：</span>
                            <span className="content">9</span>
                        </div>
                        <div className="item">
                            <span className="label">旷课人数：</span>
                            <span className="content">9</span>
                        </div>
                        <div className="item">
                            <span className="label">早退人数：</span>
                            <span className="content">9</span>
                        </div>
                    </div>

                    <div className="editBtn">编辑统计信息</div>
                </div>

                <hr/>

                <div className="studentInfo">
                    <div className="label">
                        <h4 className="name">姓名</h4>
                        <h4 className="num">学号</h4>
                        <h4 className="operation">状态</h4>
                    </div>
                    <div className="value">
                        <span className="name">上官婉儿</span>
                        <span className="num">201517030235</span>
                        <span className="operation">已签到</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentInfo;