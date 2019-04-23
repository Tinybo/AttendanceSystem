import React, { Component } from 'react';
import './studentInfo.scss';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';

import { Modal } from 'antd';

import { hashHistory } from 'react-router';
import { dateFormat } from '../../common/utils/dateFormat';
import { dialog } from '../../common/utils/dialog';
import { toast } from '../../common/utils/toast';
import { Select, Radio } from 'antd';

const RadioGroup = Radio.Group;
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
            college: '',        // 学校
            currentClass: '',   // 当前展示班级
            classes: [],        // 所有班级
            visible: true,
            currentValue: 0,
            hasStudent: true,
        }
    }

    componentWillMount () {
        // 配置基本数据
        const { data } = this.props;
        let tempData = data.combine_string;
        let tempDataArr = tempData.split(';');
        let classes = [];
        
        tempDataArr.forEach(x => {
            if (x != '') {
                classes.push(x);
            }
        });

        // 判断是否有人签到
        if (classes == []) {
            this.setState({ hasStudent: false });
        } else {
            this.setState({
                college: localStorage.getItem('college'),
                classes: classes,
                currentClass: classes[0]
            })
        }
    }

    componentDidMount () {
        const { actions, data } = this.props;

        if (!this.state.classes[0]) {
            actions.getAllStudent({
                course_id: data.id,
                college: '',
                department: '',
                major: '',
                grade: '',
                class: '',
            });
            return;
        } 

        // 默认获取第一个班级的所有学生信息
        let Class = this.state.currentClass;
        let tempClass = Class.split('-');
        actions.getAllStudent({
            course_id: data.id,
            college: tempClass[0],
            department: tempClass[1],
            major: tempClass[2],
            grade: tempClass[3],
            class: tempClass[4]
        });
    }

    /**
     * 改变学生信息。
     * @author Tinybo
     * @date 2019 04 22
     * @memberof StudentInfo
     */
    handleChange = (e) => {
        const { actions, data } = this.props;

        let index = e.target.value;
        let value = this.state.classes[index];

        this.setState({
            currentClass: value,
            currentValue: index
        });

        let temp = value.split('-');

        // 获取所选班级的学生信息
        actions.getAllStudent({
            course_id: data.id,
            college: temp[0],
            department: temp[1],
            major: temp[2],
            grade: temp[3],
            class: temp[4]
        });
    }

    /**
     * 展示操作按钮。
     * @author Tinybo
     * @date 2019 04 23
     * @memberof StudentInfo
     */
    showOperation = (data) => {
        let chooseColor = {
            1: '已签到',
            2: '#2d8cf0',
            3: '#19be6b',
            4: '#ff9900',
            5: '#ed4014'
        }
        let chooseStatus = {
            0: '操作',
            1: '已签到',
            2: '请假',
            3: '迟到',
            4: '早退',
            5: '旷课'
        }
        let text = chooseStatus[data.status] || '无';

        if (data.status == 0) {
            return (
                <span className="operation operationBtn" style={{ color: '#2d8cf0' }} onClick={ this.openSetStatus.bind(this, data) }>{ text }</span>
            );
        }
        return (
            <span className="operation" style={{ color: chooseColor[data.status] }}>{ text }</span>
        );
    }

    /**
     * 打开设置学生按钮弹框。
     * @author Tinybo
     * @date 2019 04 23
     * @memberof StudentInfo
     */
    openSetStatus = (data) => {
        dialog({
            type: 'info',
            title: '设置学生到课状态',
            visible: this.state.visible,
            content: (
                <div className="setStatus" style={{ marginTop: '15px' }}>
                    <button onClick={ this.setStatus.bind(this, 2, data) }>请假</button>
                    <button onClick={ this.setStatus.bind(this, 3, data) }>迟到</button>
                    <button onClick={ this.setStatus.bind(this, 4, data) }>早退</button>
                    <button onClick={ this.setStatus.bind(this, 5, data) }>旷课</button>
                </div>
            ),
            okText: '取 消',
            callback: () => {
                // toast('success', '告知成功！');
            }
        });
    }

    /**
     * 提交学生到课状态。
     * @author Tinybo
     * @date 2019 04 23
     * @memberof StudentInfo
     */
    setStatus = async (status, data) => {
        // toast('success', '学生状态设置成功');
        const { actions } = this.props;

        await actions.setStudentStatus({
            status: status,
            stu_id: data.userId,
            course_id: data.course_id,

            course_name: data.course_name,
            num: data.num,
            college: data.college,
            department: data.department,
            phone: data.phone,
            createTime: data.createTime,
            major: data.major,
            grade: data.grade,
            class: data.class,
        });
        console.log('开始设置学生状态了。', status, data);
        // 默认获取第一个班级的所有学生信息
        let temp = this.state.currentClass.split('-');
        setTimeout(async () => {
            await actions.getAllStudent({
                course_id: data.course_id,
                college: temp[0],
                department: temp[1],
                major: temp[2],
                grade: temp[3],
                class: temp[4]
            });
        }, 100);

        Modal.destroyAll();
    }

    /**
     * 渲染班级选项。
     * @author Tinybo
     * @date 2019 04 23
     * @memberof StudentInfo
     */
    renderChoose = (data) => {
        let temp = data.split('-');
        temp.shift();  // 删除第一个数据
        return temp.join(' · ');
    }

    render () {
        const { data } = this.props;
        const { shouldNum, realNum, lateNum, leaveEarlyNum, truancyNum, askLeaveNum, unSignInNum } = this.props.studentInfo;
        const { allStudent } = this.props.studentInfo;

        return (
            <div className="studentInfoContainer">
                <div className="chooseInfo">
                    <RadioGroup onChange={ this.handleChange } value={ this.state.currentValue }>
                        {
                            this.state.classes.map((x, index) => {
                                return (
                                    <Radio value={ index } key={ x + index }>{ this.renderChoose(x) }</Radio>
                                );
                            })
                        }
                    </RadioGroup>
                    {
                        this.state.classes[0] ? '' : (<p style={{ textAlign: 'center' }}>暂无班级加入！</p>)
                    }   
                    <div className="status">
                        <div className="item">
                            <span className="label">应到人数：</span>
                            <span className="content">{ shouldNum }</span>
                        </div>
                        <div className="item">
                            <span className="label">实到人数：</span>
                            <span className="content">{ realNum }</span>
                        </div>
                        <div className="item">
                            <span className="label">请假人数：</span>
                            <span className="content">{ askLeaveNum }</span>
                        </div>
                        <div className="item">
                            <span className="label">迟到人数：</span>
                            <span className="content">{ lateNum }</span>
                        </div>
                        <div className="item">
                            <span className="label">旷课人数：</span>
                            <span className="content">{ truancyNum }</span>
                        </div>
                        <div className="item">
                            <span className="label">早退人数：</span>
                            <span className="content">{ leaveEarlyNum }</span>
                        </div>
                        <div className="item">
                            <span className="label">未签到人数：</span>
                            <span className="content">{ unSignInNum }</span>
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
                                        { this.showOperation(x) }
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