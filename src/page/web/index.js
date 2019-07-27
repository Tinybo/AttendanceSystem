import React, { Component } from 'react';
import './web.scss';
import { hashHistory } from 'react-router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';
import * as loginActions from '../auth/login/action';

import WebHeader from '../../components/webHeader';
import Login from './login';
import Statistic from './statistic';

import { toast } from '../../common/utils/toast';

/**
 * Web端数据统计/查询页面。
 * @author Tinybo
 * @date 2019 04 29
 */
class Web extends Component {
    constructor () {
        super();

        this.state = {
            activeNav: 2
        };
    }

    /**
     * 注销程序。
     * @author Tinybo
     * @date 2019 04 13
     */
    logout = () => {
        // 清空所有用户信息
        localStorage.clear();

        const { actionsMiddle, actionsMiddleAdmin } = this.props;
        actionsMiddle.emptyData();
        actionsMiddleAdmin.emptyData();

        toast('success', '注销成功！');
        hashHistory.push('/auth');
        console.log('已经退出了。');
    }

    /**
     * 切换导航。
     * @author Tinybo
     * @date 2019 04 13
     */
    shiftNav = (num) => {
        this.setState({
            activeNav: num
        });
        console.log('当前导航：', num);
    };


    render () {
        const { isAdmin } = this.props.login;
        console.log('isAdmin', isAdmin);

        return (
            <div className="webContainer">
                <WebHeader />
                <div className="login" style={{ display: isAdmin ? 'none' : 'flex' }}>
                    <Login />
                </div>
                <div className="statistic" style={{ display: isAdmin ? 'block' : 'none' }}>
                    <Statistic />
                </div>
                
            </div>
        )
    }
}

export default connect(
    (state) => state, 
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch),
        loginActions: bindActionCreators(loginActions, dispatch),
    })
)(Web);