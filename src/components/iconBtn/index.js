import React, { Component } from 'react';
import './iconBtn.scss';
import { Icon } from 'antd';
import { hashHistory } from 'react-router';

/**
 * 模版组件。
 * @author Tinybo
 * @date 2018 12 11
 */
class IconBtn extends Component {
    constructor () {
        super();
    }

    render () {
        const { text, textColor, textBold, callback, imgUrl, textSize, imgSize } = this.props;
        let backFun = callback ? callback : this.back;
        let txtColor = textColor ? textColor : 'black';
        let txtBold = textBold ? textBold : 'normal';
        let txtSize = textSize ? textSize : '14px';
        let imageSize = imgSize ? imgSize : '33';

        return (
            <div className="iconBtnContainer" onClick={ callback }>
                <img src={ imgUrl } alt="logo" width={ imageSize } height={ imageSize } />
                <span style={{ color: txtColor, fontWeight: txtBold, fontSize: txtSize }}>{ text }</span>
            </div>
        )
    }
}

export default IconBtn;