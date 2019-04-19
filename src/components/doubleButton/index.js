import React, { Component } from 'react';
import './doubleButton.scss';
import { hashHistory } from 'react-router';

/**
 * 双底部按钮组件。
 * @author Tinybo
 * @date 2019 04 19
 */
class DoubleButton extends Component {
    constructor () {
        super();
    }

    back = () => {
        let { url } = this.props;
        hashHistory.push(url);
    }

    render () {
        const { callback1, callback2, text1, text2, color1, color2 } = this.props;

        return (
            <div className="doubleBtnContainer">
                <button style={{ background: color1, border: '1px solid ' + color1 }} onClick={ callback1 }>{ text1 }</button>
                <button style={{ background: color2, border: '1px solid ' + color2 }} onClick={ callback2 }>{ text2 }</button>
            </div>
        )
    }
}

export default DoubleButton;