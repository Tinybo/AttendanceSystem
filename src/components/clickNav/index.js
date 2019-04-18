import React, { Component } from 'react';
import './clickNav.scss';
import Arrow from '../../common/images/arrow.png';
import { Badge, Icon } from 'antd';

/**
 * 可点击导航标签组件。
 * @author Tinybo
 * @date 2019 04 18
 */
class ClickNav extends Component {
    constructor () {
        super();
    }

    /**
     * 渲染 Tab 选项。
     * @author Tinybo
     * @date 2019 04 18
     * @memberof ClickNav
     */
    renderTab = (text, active, callback, statistic) => {
        return text.map((x, index) => {
            return (
                <div className="navItem" key={ index } style={{ 
                    color:  active == index ? '#2d8cf0' : '#808695',
                    fontWeight: active == index ? 'bold' : 'normal',
                }} onClick={() => { callback(index) }}>
                    <Badge offset={ [10, 0] } showZero count={ statistic[index] }>{ x }</Badge>
                </div>
            );
        })
    }

    render () {
        const { text, active, callback, statistic } = this.props;

        return (
            <div className="clickNavContainer">
                { this.renderTab(text, active, callback, statistic) }
            </div>
        )
    }
}

export default ClickNav;