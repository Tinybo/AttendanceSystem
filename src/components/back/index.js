import React, { Component } from 'react';
import './back.scss';
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

    back = () => {
        let { url } = this.props;
        hashHistory.push(url);
    }

    render () {
        const { text } = this.props;

        return (
            <div className="backContainer" onClick={ this.back }>
                <img src={require("../../common/images/backWhite.png")} alt="logo" width="20" height="20" />
                <span>{ text }</span>
            </div>
        )
    }
}

export default Back;