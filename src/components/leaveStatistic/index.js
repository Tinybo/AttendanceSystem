import React, { Component } from 'react';
import './leaveStatistic.scss';
import { Icon } from 'antd';
import { hashHistory } from 'react-router';

import NavLabel from '../navLabel';
import 'ant-design-pro/dist/ant-design-pro.css'; // 统一引入样式
import { Pie, yuan } from 'ant-design-pro/lib/Charts';

/**
 * 请假统计组件。
 * @author Tinybo
 * @date 2018 12 11
 */
class LeaveStatistic extends Component {
    constructor () {
        super();
    }

    /**
     * 统计请假信息。
     * @date 2019 04 24
     * @memberof LeaveStatistic
     */
    statistic = (data) => {
        let success = 0;    // 请假成功次数
        let fail = 0;       // 请假失败次数
        let checking = 0;   // 审核中次数
        let cancel = 0;     // 已销假次数

        if (data[0]) {
            data.forEach(x => {
                switch (x.isSuccess) {
                    case 0: checking++; break;
                    case 1: success++; break;
                    case 2: fail++; break;
                    case 3: cancel++; break;
                    default: break;
                }
            })
        }
        return [
            {
              x: '请假成功',
              y: success,
            },
            {
              x: '请假失败',
              y: fail,
            },
            {
              x: '审核中',
              y: checking,
            },
            {
              x: '已销假',
              y: cancel,
            }
          ];
    }

    render () {
        const { data } = this.props;

        return (
            <div className="leaveStatisticContainer">
                <NavLabel text="请假统计" background="white" />
                <Pie
                    hasLegend
                    data={ this.statistic(data) }
                    height={ 100 }
                />
            </div>
        )
    }
}

export default LeaveStatistic;