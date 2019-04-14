import React, { Component } from 'react';
import './navLabel.scss';
import Arrow from '../../common/images/arrow.png';

/**
 * 导航标签组件。
 * @author Tinybo
 * @date 2019 04 14
 */
class NavLabel extends Component {
    constructor () {
        super();
    }

    render () {
        const { text, imgUrl } = this.props;

        return (
            <div className="labelContainer">
                <img src={ Arrow } alt="label" width="20" height="20" />
                <span>{ text }</span>
            </div>
        )
    }
}

export default NavLabel;