import React, { Component } from 'react';
import './back.scss';
import { Icon } from 'antd';
import { hashHistory } from 'react-router';

/**
 * 模版组件。
 * @author Tinybo
 * @date 2018 12 11
 */
class Back extends Component {
    constructor () {
        super();
    }

    /**
     *
     * 返回指定路由。
     * @author Tinybo
     * @date 2019n 04 13
     * @memberof Back
     */
    back = () => {
        let { url } = this.props;
        hashHistory.push(url);
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
        const { text, textColor, textBold, callback } = this.props;
        let txtColor = textColor ? textColor : 'white';
        let txtBold = textBold ? textBold : 'normal';
        let backFun = callback ? callback : this.back;

        return (
            <div className="backContainer" onClick={ backFun }>
                { this.showIcon() }
                <span style={{ color: txtColor, fontWeight: txtBold }}>{ text }</span>
            </div>
        )
    }
}

export default Back;