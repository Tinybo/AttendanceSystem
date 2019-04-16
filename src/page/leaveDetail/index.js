import React, { Component } from 'react';
import './leaveDetail.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';
import { hashHistory } from 'react-router';

import { dateFormat } from '../../common/utils/dateFormat';
import Header from '../../components/header';
import NavLabel from '../../components/navLabel';
import DetailItem from '../../components/detailItem';
import BottomButton from '../../components/bottomButton';
/**
 * 请假条详情。
 * @author Tinybo
 * @date 2019 04 16
 */
class LeaveDetail extends Component {
    constructor () {
        super();
    }

    /**
     * 返回主页。
     * @author Tinybo
     * @date 2019 04 16
     * @memberof LeaveDetail
     */
    back = () => {
        hashHistory.push('/home');
    }
    
    /**
     * 完成销假操作。
     * @author Tinybo
     * @date 2019 04 16
     * @memberof LeaveDetail
     */
    cancelLeave = () => {
        console.log('进入销假');
        const { actions } = this.props;
        let data = this.props.location.query;
        let type = localStorage.getItem('type');

        // 销假
        actions.cancelLeave({
            id: data.id,
            userId: data.userId,
            type: type
        });
    }

    render () {
        let data = this.props.location.query;
        let type = localStorage.getItem('type');

        return (
            <div className="leaveDetailContainer">
                <header>
                    <Header btnText="返回" callback={ this.back } />
                    <NavLabel text="请假条详情" />
                </header>
                
                <main>
                    <div className="status">
                        <img src={ data.urlImg } alt="statusIcon" width="88" height="88" />
                    </div>
                    <DetailItem label="姓名" value={ data.name } />
                    <DetailItem label="学号" value={ data.num } />
                    <DetailItem label="学校" value={ data.college } />
                    <DetailItem label="系别" value={ data.department } />
                    { type == 1 ? <DetailItem label="专业" value={ data.major } /> : '' }
                    { type == 1 ? <DetailItem label="年级" value={ data.grade } /> : '' }
                    { type == 1 ? <DetailItem label="班级" value={ data.major } /> : '' }
                    <DetailItem label="开始时间" value={ dateFormat(data.startTime) } />
                    <DetailItem label="结束时间" value={ dateFormat(data.endTime) } />
                    <DetailItem label="手机号" value={ data.phone } />
                    <DetailItem label="请假事由" value={ data.reason } />
                </main>

                <footer style={{ display: data.isSuccess == '0' ? 'block' : 'none' }}>
                    <BottomButton text="销 假" callback={ this.cancelLeave } />
                </footer>
            </div>
        )
    }
}

export default connect(
    (state) => state, 
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(LeaveDetail);