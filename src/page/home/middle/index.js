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

const TabPane = Tabs.TabPane;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
    )}
  </Sticky>
);



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

        let dataSource = actions.getLeaveNote({
            num: num,
            userId: userId,
            type: type
        });
    }

    componentDidMount () {
        console.log('请假条：', this.props.getLeaveNote);
    }

    /**
     * 渲染请假记录卡片。
     * @author Tinybo
     * @date 2019 04 14
     * @memberof Middle
     */
    renderLeaveRecord = () => {
        // 模拟数据
        let datas = [
            {
                title: '张宇的请假',
                urlImg: SuccessIcon,
                reason: '由于身体不舒服，想去大医院做一个全面的检查。',
                startTime: '2019-03-18 上午',
                endTime: '2019-03-18 下午',
                createTime: '2019-03-17',
                status: 1
            },
            {
                title: '张宇的请假',
                urlImg: CheckingIcon,
                reason: '由于身体不舒服，想去大医院做一个全面的检查。',
                startTime: '2019-03-18 上午',
                endTime: '2019-03-18 下午',
                createTime: '2019-03-17',
                status: 0
            },
            {
                title: '张宇的请假',
                urlImg: FailIcon,
                reason: '由于身体不舒服，想去大医院做一个全面的检查。',
                startTime: '2019-03-18 上午',
                endTime: '2019-03-18 下午',
                createTime: '2019-03-17',
                status: 2
            }

        ];

        let oriColor = {
            0: '#2d8cf0',
            1: '#19be6b',
            2: '#ed4014'
        };

        return (
            <div className="recordContainer" >
                {
                    datas.length > 0 ?
                    datas.map((x, index) => {
                        return <Timeline.Item key={ index } color={ oriColor[x.status] }><LeaveCard data={ x } /></Timeline.Item>
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
        switch (active) {
            case '1': hashHistory.push('/leave'); break;
            case '2': hashHistory.push('/auth'); break;
            case '3': hashHistory.push('/leave'); break;
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