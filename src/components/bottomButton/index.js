import React, { Component } from 'react';
import './bottomButton.scss';
import { hashHistory } from 'react-router';

/**
 * 模版组件。
 * @author Tinybo
 * @date 2018 12 11
 */
class BottomButton extends Component {
    constructor () {
        super();
    }

    back = () => {
        let { url } = this.props;
        hashHistory.push(url);
    }

    render () {
        const { callback, text } = this.props;

        return (
            <div className="bottomBtnContainer">
                <button onClick={ callback }>{ text }</button>
            </div>
        )
    }
}

export default BottomButton;