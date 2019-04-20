import React, { Component } from 'react';
import './middle.scss';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';
import { hashHistory } from 'react-router';
import Nav from '../nav';
import { Tabs, Icon, Timeline } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import LeaveCard from '../../../components/leaveCard';

import SuccessIcon from '../../../common/images/checkPass.png';
import FailIcon from '../../../common/images/failed.png';
import CheckingIcon from '../../../common/images/checking.png';
import CancelIcon from '../../../common/images/cancelLeave.png';

const TabPane = Tabs.TabPane;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
    )}
  </Sticky>
);

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
 * 主页中间主体内容。
 * @author Tinybo
 * @date 2019 04 15
 */
class Middle extends Component {
    constructor () {
        super();
    }

    componentWillMount () {
        const { actions } = this.props;

        // 获取所有请假条信息
        let type = localStorage.getItem('type');
        let num = localStorage.getItem('num');
        let userId = localStorage.getItem('userId');

        actions.getLeaveNote({
            num: num,
            userId: userId,
            type: type
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
     * 渲染请假记录卡片。
     * @author Tinybo
     * @date 2019 04 14
     * @memberof Middle
     */
    renderLeaveRecord = () => {
        const { leaveNoteData } = this.props.middle;
        let dataTemp = [];

        if (leaveNoteData.length > 0) {
            for (let i = leaveNoteData.length - 1; i >= 0; i--) {
                dataTemp.push(leaveNoteData[i]);
            }
        }
        console.log('请假条：', leaveNoteData);

        return (
            <div className="recordContainer" >
                {
                    dataTemp.length > 0 ?
                    dataTemp.map((x, index) => {
                        return <Timeline.Item key={ index } color={ oriColor[x.isSuccess] }><LeaveCard data={ x } iconImg={ urlImg[x.isSuccess] } onClick={ this.toDetail.bind(this, x) } /></Timeline.Item>
                    })
                    :
                    <Timeline.Item color="#515a6e">暂无记录</Timeline.Item>
                }
            </div>

        );
    }

    /**
     * 切换导航。
     * @author Tinybo
     * @date 2019 04 14
     * @memberof Middle
     */
    shiftPage = (active) => {
        let type = localStorage.getItem('type');

        switch (active) {
            case 1: hashHistory.push('/leave'); break;
            case 2: type == '1' ? hashHistory.push('/attendance/student') : hashHistory.push('/attendance/teacher'); break;
            case 3: hashHistory.push('/leave'); break;
            default: hashHistory.push('/leave'); break;
        }
    }

    render () {
        return (
            <div className="middleContainer">
                <Nav callback={ this.shiftPage } />
                <main>
                    <StickyContainer>
                        <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
                            <TabPane tab={<span><Icon type="file-text" />请假记录</span>} key="1">
                                { this.renderLeaveRecord() }
                            </TabPane>
                            <TabPane tab={<span><Icon type="pie-chart" />数据统计</span>} key="2">
                                Tab 2
                            </TabPane>
                        </Tabs>
                    </StickyContainer>
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
)(Middle);