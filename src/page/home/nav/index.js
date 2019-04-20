import React, { Component } from 'react';
import './nav.scss';

import IconBtn from '../../../components/iconBtn';
import Leave from '../../../common/images/leave.png';
import Arrive from '../../../common/images/arrive.png';
import Advice from '../../../common/images/advice.png';


/**
 * 主页导航组件。
 * @author Tinybo
 * @date 2018 12 11
 */
class Nav extends Component {
    constructor () {
        super();
    }

    /**
     * 切换导航。
     * @author Tinybo
     * @date 2019 04 14
     * @memberof Nav
     */
    shiftNav = (nav, e) => {
        const { callback } = this.props;
        console.log('当前导航：', nav);
        callback(nav);  
    }

    render () {
        let type = localStorage.getItem('type');

        return (
            <div className="navContainer animated fadeInDown">
                <IconBtn imgUrl={ Leave } text="请 假" textBold="bold" callback={ this.shiftNav.bind(this, 1) } />
                <IconBtn imgUrl={ Arrive } text={ type == '1' ? '签 到' : '点到' } textBold="bold" callback={ this.shiftNav.bind(this, 2) } />
                <IconBtn imgUrl={ Advice } text="投 诉" textBold="bold" callback={ this.shiftNav.bind(this, 3) } />
            </div>
        )
    }
}

export default Nav;