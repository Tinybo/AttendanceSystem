import React, { Component } from 'react';
import './left.scss';


/**
 * 模版组件。
 * @author Tinybo
 * @date 2018 12 11
 */
class Left extends Component {
    constructor () {
        super();
    }

    render () {
        return (
            <div className="leftContainer">
                消息
            </div>
        )
    }
}

export default Left;