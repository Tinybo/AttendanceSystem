import React, { Component } from 'react';
import './detailItem.scss';
import { Icon } from 'antd';
import { hashHistory } from 'react-router';

/**
 * 详情项组件。
 * @author Tinybo
 * @date 2018 12 11
 */
class DetailItem extends Component {
    constructor () {
        super();
    }

    /**
     * 显示按钮图标。
     * @author Tinybo
     * @date 2019 04 13
     * @memberof Back
     */
    showIcon = () => {
        const { icon, textColor, textBold} = this.props;
        let txtColor = textColor ? textColor : 'white';
        let txtBold = textBold ? textBold : 'normal';

        if (icon) {
            return (
                <Icon type={ icon } style={{ color: txtColor, fontWeight: txtBold, fontSize: '16px' }} />
            );
        }
        return (
            <img src={require("../../common/images/backWhite.png")} alt="logo" width="20" height="20" />
        );
    }

    render () {
        const { label, value } = this.props;

        return (
            <div className="detailItemContainer">
                <div className="left" style={{ fontWeight: label == '拒绝理由' ? 'bold' : 'normal' }}>{ label }</div>
                <div className="right">{ value}</div>
            </div>
        )
    }
}

export default DetailItem;