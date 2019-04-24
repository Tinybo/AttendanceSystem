import React, { Component } from 'react';
import './attendStatistic.scss';
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
class AttendStatistic extends Component {
    constructor () {
        super();
    }

    /**
     * 统计请假信息。
     * @date 2019 04 24
     * @memberof LeaveStatistic
     */
    statistic = (data) => {
        let realNum = 0;        // 总到课数
        let askLeaveNum = 0;    // 总请假数
        let lateNum = 0;        // 总迟到数
        let truancyNum = 0;     // 总旷课数
        let leaveEarlyNum = 0;  // 总早退数

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
        }
        return [
            {
              x: '总到课',
              y: realNum,
            },
            {
              x: '总请假',
              y: askLeaveNum,
            },
            {
              x: '总迟到',
              y: lateNum,
            },
            {
              x: '总早退',
              y: leaveEarlyNum,
            },
            {
              x: '总旷课',
              y: truancyNum,
            }
          ];
    }

    render () {
        const { data } = this.props;

        return (
            <div className="attendStatisticContainer">
                <NavLabel text="考勤统计" background="white" />
                <Pie
                    hasLegend
                    data={ this.statistic(data) }
                    height={ 100 }
                />
            </div>
        )
    }
}

export default AttendStatistic;