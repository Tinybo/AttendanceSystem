import React, { Component } from 'react';
import './leaveDetail.scss';
import { Modal, Button, Input } from 'antd';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';
import * as actionsLeave from '../home/middleAdmin/action';
import { hashHistory } from 'react-router';

import { toast } from '../../common/utils/toast';
import { dateFormat } from '../../common/utils/dateFormat';
import Header from '../../components/header';
import NavLabel from '../../components/navLabel';
import DetailItem from '../../components/detailItem';
import BottomButton from '../../components/bottomButton';
import DoubleButton from '../../components/doubleButton';

const { TextArea } = Input;

/**
 * 请假条详情。
 * @author Tinybo
 * @date 2019 04 16
 */
class LeaveDetail extends Component {
    constructor () {
        super();

        this.state = {
            visible: false,
            reject: ''
        }
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
     * 显示填写拒绝理由对话框。
     * @author Tinybo
     * @date 2019 04 19
     * @memberof LeaveDetail
     */
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    /**
     * 实时更新拒绝理由。
     * @author Tinybo
     * @date 2019 04 19
     * @memberof LeaveDetail
     */
    handleChange = (e) => {
        this.setState({
            reject: e.target.value
        });
    } 
    
    /**
     * 对话框确认按钮。
     * @author Tinbo
     * @date 2019 04 19
     * @memberof LeaveDetail
     */
    handleOk = (e) => {
        if (this.state.reject === '') {
            toast('warning', '请先填写拒绝理由！');
            return;
        }

        console.log('拒绝理由：', this.state.reject);
        let { actions } = this.props;
        let data = this.props.location.query;
        let type = localStorage.getItem('type');

        // 销假
        actions.rejectLeave({
            id: data.id,
            userId: data.userId,
            type: type,
            note: this.state.reject
        });

        this.setState({
            visible: false,
        });
    }

    /**
     * 对话框取消按钮。
     * @author Tinbo
     * @date 2019 04 19
     * @memberof LeaveDetail
     */
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
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

    /**
     * 请假条确认通过。
     * @author Tinybo
     * @date 2019 04 19
     * @memberof LeaveDetail
     */
    pass = async () => {
        const { actionsLeave } = this.props;
        let type = localStorage.getItem('type');
        let data = this.props.location.query;

        await actionsLeave.passLeave({
            type: type,
            id: data.id,
            userId: data.userId
        });

        hashHistory.push('/home');
        console.log('请假条通过', this.props);
    }

    /**
     * 请假条拒绝通过。
     * @author Tinybo
     * @date 2019 04 19
     * @memberof LeaveDetail
     */
    noPass = () => {
        console.log('拒绝通过');
        this.showModal();
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
                    {
                        data.note ? (
                            <DetailItem label="拒绝理由" value={ data.note } />
                        ): ''
                    }

                    <Modal
                        title="填写拒绝理由"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText="确定拒绝"
                        cancelText="取消拒绝" 
                        >
                        <TextArea rows={5} defaultValue={ this.state.reject } ref="reject" placeholder="填写拒绝理由……" onChange={ this.handleChange } />
                    </Modal>
                </main>

                <footer style={{ display: data.isSuccess == '0' ? 'block' : 'none' }}>
                    {
                        (type == 1 || type == 2) ? 
                        (
                            <BottomButton text="销 假" callback={ this.cancelLeave } />
                        ):
                        (
                            <DoubleButton 
                                text1="拒绝通过" 
                                color1="#ed4014" 
                                text2="确认通过"
                                color2="#2d8cf0"
                                callback1={ this.noPass }
                                callback2={ this.pass } />
                        )
                    }
                </footer>
            </div>
        )
    }
}

export default connect(
    (state) => state, 
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch),
        actionsLeave: bindActionCreators(actionsLeave, dispatch),
    })
)(LeaveDetail);