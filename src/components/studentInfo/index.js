import React, { Component } from 'react';
import './studentInfo.scss';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';

import { hashHistory } from 'react-router';
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
            colleges: [],       // 所有大学
            departments: [],    // 所有系别
            majors: [],         // 所有专业
            grades: [],         // 所有年级
            Classs: [],         // 所有班级
            department: '',     // 当前选择的系别
            major: '',          // 当前选择的专业
            grade: '',          // 当前选择的年级
            Class: ''           // 当前选择的班级
        }
    }

    componentWillMount () {
        // 配置基本数据
        const { data } = this.props;
        let tempData = data.combine_string;
        let tempDataArr = tempData.split(';');
        let colleges = [];
        let departments = [];
        let majors = [];
        let grades = [];
        let Class = [];
        
        tempDataArr.forEach(x => {
            if (x != '') {
                let temp = x.split('-');
                colleges.push(temp[0]);
                departments.push(temp[1]);
                majors.push(temp[2]);
                grades.push(temp[3]);
                Class.push(temp[4]);
            }
        });

        this.setState({
            colleges: Array.from(new Set(colleges)),
            departments: Array.from(new Set(departments)),
            majors: Array.from(new Set(majors)),
            grades: Array.from(new Set(grades)),
            Classs: Array.from(new Set(Class)),
            department: departments[0],
            major: majors[0],
            grade: grades[0],
            Class: Class[0] 
        })
    }

    componentDidMount () {
        const { actions, data } = this.props;

        actions.getAllStudent({
            course_id: data.id,
            college: this.state.colleges[0],
            department: this.state.department,
            major: this.state.major,
            grade: this.state.grade,
            class: this.state.Class
        });
    }

    /**
     * 改变学生信息。
     * @author Tinybo
     * @date 2019 04 22
     * @memberof StudentInfo
     */
    handleChange = (value, e) => {
        const { actions, data } = this.props;

        let department = this.state.department;
        let major = this.state.major;
        let grade = this.state.grade;
        let Class = this.state.Class;
        
        if (e.key.indexOf('department') != -1) {
            department = value;
            this.setState({ department: value });
        } else if (e.key.indexOf('major') != -1) {
            major = value;
            this.setState({ major: value });
        } else if (e.key.indexOf('grade') != -1) {
            grade = value;
            this.setState({ grade: value });
        } else if (e.key.indexOf('class') != -1) {
            Class = value;
            this.setState({ Class: value });
        }

        actions.getAllStudent({
            course_id: data.id,
            college: this.state.colleges[0],
            department: department,
            major: major,
            grade: grade,
            class: Class
        });
    }

    render () {
        const { data } = this.props;
        const { allStudent } = this.props.studentInfo;

        console.log('这就是所有学生：', allStudent);

        return (
            <div className="studentInfoContainer">
                <div className="chooseInfo">
                    <Select defaultValue={ this.state.department } ref="department" onChange={ this.handleChange }>
                        {
                            this.state.departments.map((x, index) => {
                                return (
                                    <Option key={ x + index + 'department' } value={ x }>{ x }</Option>
                                );
                            })
                        }
                    </Select>
                    <Select defaultValue={ this.state.major } onChange={ this.handleChange }>
                        {
                            this.state.majors.map((x, index) => {
                                return (
                                    <Option key={ x + index + 'major' } value={ x }>{ x }</Option>
                                );
                            })
                        }
                    </Select>
                    <Select defaultValue={ this.state.grade } onChange={ this.handleChange }>
                        {
                            this.state.grades.map((x, index) => {
                                return (
                                    <Option key={ x + index + 'grade' } value={ x }>{ x }</Option>
                                );
                            })
                        }
                    </Select>
                    <Select defaultValue={ this.state.Class } onChange={ this.handleChange }>
                        {
                            this.state.Classs.map((x, index) => {
                                return (
                                    <Option key={ x + index + 'class' } value={ x }>{ x }</Option>
                                );
                            })
                        }
                    </Select>

                    <div className="status">
                        <div className="item">
                            <span className="label">应到人数：</span>
                            <span className="content">{ data.should_num }</span>
                        </div>
                        <div className="item">
                            <span className="label">实到人数：</span>
                            <span className="content">{ data.real_num }</span>
                        </div>
                        <div className="item">
                            <span className="label">请假人数：</span>
                            <span className="content">{ data.ask_leave_num }</span>
                        </div>
                        <div className="item">
                            <span className="label">迟到人数：</span>
                            <span className="content">{ data.late_num }</span>
                        </div>
                        <div className="item">
                            <span className="label">旷课人数：</span>
                            <span className="content">{ data.truancy_num }</span>
                        </div>
                        <div className="item">
                            <span className="label">早退人数：</span>
                            <span className="content">{ data.leave_early_num }</span>
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
                        {
                            allStudent.map((x, index) => {
                                return (
                                    <div key={ x + index }>
                                        <span className="name">{ x.stu_name }</span>
                                        <span className="num">{ x.num }</span>
                                        <span className="operation">{ x.status }</span>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => state, 
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(StudentInfo);