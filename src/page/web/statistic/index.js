import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';

import { dateFormat } from '../../../common/utils/dateFormat';
import './statistic.scss';
import Table from '../table';
import { Tabs, Icon, Radio } from 'antd';

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

/**
 * We端统计组件。
 * @author Tinybo
 * @date 2019 05 12
 */
class Statistic extends Component {
    constructor () {
        super();

        this.state = {
            oriData: [],
            chooseValue: 1,
            tabActive: 1
        }
    }

    componentWillMount () {
        const college = localStorage.getItem('college');
        const { actions } = this.props;

        actions.getAllLeave({
            college: college,
            userType: 'student'
        });
    }

    /**
     * 选择数据类型。
     * @author Tinybo
     * @date 2019 05 13
     * @memberof Statistic
     */
    onChange = (e) => {
        const college = localStorage.getItem('college');
        const { actions } = this.props;
        
        if (e.target.value == 1) {
            actions.getAllLeave({
                college: college,
                userType: 'student'
            });
        } else {
            actions.getAllLeave({
                college: college,
                userType: 'teacher'
            });
        }   
        
        this.setState({
            chooseValue: e.target.value,
        });
    }

    /**
     * 切换Tab。
     * @author Tinybo
     * @date 2019 05 13
     */
    changeTab = (e) => {
        this.setState({
            tabActive: e
        });

        const college = localStorage.getItem('college');
        const { actions } = this.props;

        if (e == 2) {
            actions.getAllAttendance({
                isStatistic: true,
                college: college
            });
        } else {
            if (this.state.chooseValue == 1) {
                actions.getAllLeave({
                    college: college,
                    userType: 'student'
                });
            } else {
                actions.getAllLeave({
                    college: college,
                    userType: 'teacher'
                });
            }
        }
    }

    /**
     * 获取课堂的具体信息。
     * @author Tinybo
     * @date 2019 05 14
     * @memberof Statistic
     */
    getCourseInfo = (data) => {
        const { actions } = this.props;

        actions.getCourseInfo(data);
    }

    /**
     * 处理请假条数据。
     * @author Tinybo
     * @date 2019 05 12
     * @memberof Statistic
     */
    handleData = (data) => {
        let oriData = [];
        const chooseStatus = {
            0: '审批中',
            1: '已通过',
            2: '未通过'
        };

        const courseStatus = {
            0: '签到中',
            1: '已结束'
        }

        if (this.state.tabActive == 1) {
            data.forEach((x, index) => {
                if (!chooseStatus[x.isSuccess]) return;
                if (this.state.chooseValue == 1) {
                    oriData.push({
                        id: x.id,
                        name: x.name,
                        num: x.num,
                        department: x.department,
                        major: x.major,
                        grade: x.grade,
                        class: x.class,
                        startTime: dateFormat(x.startTime),
                        endTime: dateFormat(x.endTime),
                        reason: x.reason,
                        phone: x.phone,
                        createTime: x.createTime,
                        qq: x.qq,
                        status: chooseStatus[x.isSuccess],
                    });
                } else {
                    oriData.push({
                        id: x.id,
                        name: x.name,
                        num: x.num,
                        department: x.department,
                        startTime: dateFormat(x.startTime),
                        endTime: dateFormat(x.endTime),
                        createTime: x.createTime,
                        phone: x.phone,
                        reason: x.reason,
                        status: chooseStatus[x.isSuccess]
                    });
                }
            });
        } else {
            data.forEach((x, index) => {
                oriData.push({
                    id: x.id,
                    name: x.name,
                    teaName: x.tea_name,
                    college: x.college,
                    num: x.num,
                    address: x.address,
                    createTime: dateFormat(x.createTime),
                    status: courseStatus[x.isFinish]
                });
            });
        }

        return oriData;
    }

    /**
     * 统计课堂信息。
     * @author Tinybo
     * @date 2019 05 14
     */
    handleCourseInfo = (data) => {
        let shouldNum = 0;
        let realNum = 0;
        let askLeaveNum = 0;
        let lateNum = 0;
        let truancyNum = 0;
        let leaveEarlyNum = 0;

        if (data[0]) {
            data.forEach(x => {
                switch (x.status) {
                    case 1: realNum++; break;
                    case 2: askLeaveNum++; break;
                    case 3: lateNum++; break;
                    case 4: leaveEarlyNum++; break;
                    case 5: truancyNum++; break;
                    default: break;
                }
            })
            return {
                realNum: realNum,
                shouldNum: data.length,
                askLeaveNum: askLeaveNum,
                lateNum: lateNum,
                truancyNum: truancyNum,
                leaveEarlyNum: leaveEarlyNum
            }
        } else {
            return { 
                realNum: 0,
                shouldNum: 0,
                askLeaveNum: 0,
                lateNum: 0,
                truancyNum: 0,
                leaveEarlyNum: 0
            }
        }
    }

    render () {
        let data = this.props.statistic.dataSource;
        let courseInfo = this.props.statistic.courseInfo;
        return (
            <div className="statisticContainer animated fadeInUp">
                <Tabs defaultActiveKey={ this.state.tabActive } onChange={ this.changeTab }>
                    <TabPane tab={<span><Icon type="form" />请假统计</span>} key="1">
                        <RadioGroup onChange={this.onChange} value={this.state.chooseValue}>
                            <Radio value={1}>学生数据</Radio>
                            <Radio value={2}>教师数据</Radio>
                        </RadioGroup>
                        <Table type="leave" active={ this.state.chooseValue } dataSource={ this.handleData(data) } />
                        <p>共 { data.length } 条数据</p>
                    </TabPane>

                    <TabPane tab={<span><Icon type="pie-chart" />考勤统计</span>} key="2">
                        <Table type="attendance" courseInfo={ this.handleCourseInfo(courseInfo) } getCourseInfo={ this.getCourseInfo } active={ this.state.chooseValue } dataSource={ this.handleData(data) } />
                        <p>共 { data.length } 条数据</p>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default connect(
    (state) => state, 
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(Statistic);