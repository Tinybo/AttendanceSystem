import React, { Component } from 'react';
import './middleAdmin.scss';
import { hashHistory } from 'react-router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';

import { Timeline } from 'antd';
import LeaveCard from '../../../components/leaveCard';
import ClickNav from '../../../components/clickNav';
import SuccessIcon from '../../../common/images/checkPass.png';
import FailIcon from '../../../common/images/failed.png';
import CheckingIcon from '../../../common/images/checking.png';
import CancelIcon from '../../../common/images/cancelLeave.png';

// 时间轴圆圈颜色
let oriColor = {
    0: '#2d8cf0',
    1: '#19be6b',
    2: '#ed4014',
    3: '#515a6e'
};

// 请假条状态图片
let urlImg = {
    0: CheckingIcon,
    1: SuccessIcon,
    2: FailIcon,
    3: CancelIcon
};

/**
 * 学工办和学院领导的主页。
 * @author Tinybo
 * @date 2019 04 18
 */
class MiddleAdmin extends Component {
    constructor () {
        super();

        this.state = {
            activeNav: 0
        }
    }

    componentDidMount () {
        this.getLeaveData();    // 获取所有请假条信息
    }

    /**
     * 定时获取请假条。
     * @author Tinybo
     * @date 2019 04 18
     * @memberof MiddleAdmin
     */
    getLeaveData = () => {
        const { actions } = this.props;

        // 获取所有请假条信息
        let type = localStorage.getItem('type');
        let college = localStorage.getItem('college');
        let department = localStorage.getItem('department');

        actions.getAllLeave({
            type: type,
            college: college,
            department: department
        });
    }

    /**
     * 跳转至请假条详情页。
     * @author Tinybo
     * @date 2019 04 16
     * @memberof Middle
     */
    toDetail = (data) => {
        console.log('即将进入请假条详情页：', data);
        hashHistory.push({
            pathname: '/leaveDetail',
            query: Object.assign({}, data, { urlImg: urlImg[data.isSuccess] })
        });
    }

    /**
     * 切换导航栏。
     * @author Tinybo
     * @date 2019 04 18
     * @memberof MiddleAdmin
     */
    changeActive = (value) => {
        this.setState({
            activeNav: value, 
            statistic: [0, 0, 0]
        });

        this.getLeaveData();
    }

    /**
     * 请假通过。
     * @author Tinybo
     * @date 2019 04 18
     */
    pass = (userId, leaveId) => {
        const { actions } = this.props;
        let type = localStorage.getItem('type');

        actions.passLeave({
            type: type,
            id: leaveId,
            userId: userId
        });
        console.log('已经通过了', userId, leaveId);
    }

    /**
     * 渲染请假记录卡片。
     * @author Tinybo
     * @date 2019 04 18
     * @memberof MiddleAdmin
     */
    renderLeaveRecord = (activeNav) => {
        const { allLeave } = this.props.middleAdmin;
        let dataTemp = [];

        if (allLeave && allLeave.length > 0) {
            for (let i = allLeave.length - 1; i >= 0; i--) {
                dataTemp.push(allLeave[i]);
            }
        }
        console.log('学生所有请假条：', allLeave);

        return (
            <div className="recordContainer" >
                {
                    dataTemp.length > 0 ?
                    dataTemp.map((x, index) => {
                        return (
                            <Timeline.Item style={{ display: x.isSuccess == activeNav ? 'block' : 'none' }} key={ index } color={ oriColor[x.isSuccess] }>
                                <LeaveCard data={ x } iconImg={ urlImg[x.isSuccess] } onClick={ this.toDetail.bind(this, x) } buttonText="一键通过" buttonCallback={ this.pass } />
                            </Timeline.Item>
                        );
                    })
                    :
                    <Timeline.Item color="#515a6e">暂无记录</Timeline.Item>
                }
            </div>

        );
    }

    render () {
        // 统计请假条个数
        const { allLeave } = this.props.middleAdmin;
        let todo = 0;
        let pass = 0;
        let noPass = 0;

        if (allLeave && allLeave.length > 0) {
            for (let i = allLeave.length - 1; i >= 0; i--) {
                switch (allLeave[i].isSuccess) {
                    case 0: todo++; break;
                    case 1: pass++; break;
                    case 2: noPass++; break;
                    default: break;
                } 
            }
        }

        return (
            <div className="middleAdminContainer">
                <ClickNav text={ ['待批假', '已批假', '批假未通过'] } 
                    active={ this.state.activeNav }
                    callback={ this.changeActive } 
                    statistic={ [todo, pass, noPass] }
                />
                
                <main>
                    { this.renderLeaveRecord(this.state.activeNav) }
                </main>
            </div>
        )
    }
}

export default connect(
    (state) => state, 
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(MiddleAdmin);