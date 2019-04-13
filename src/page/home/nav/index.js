import React, { Component } from 'react';
import './nav.scss';

import IconBtn from '../../../components/iconBtn';
import Leave from '../../../common/images/leave.png';
import Arrive from '../../../common/images/arrive.png';
import Advice from '../../../common/images/advice.png';


/**
 * 模版组件。
 * @author Tinybo
 * @date 2018 12 11
 */
class Nav extends Component {
    constructor () {
        super();
    }

    shiftNav = (nav, e) => {
        console.log(nav);
    }

    render () {
        return (
            <div className="navContainer animated fadeInUp">
                <IconBtn imgUrl={ Leave } text="请 假" textBold="bold" callback={ this.shiftNav.bind(this, 1) } />
                <IconBtn imgUrl={ Arrive } text="签 到" textBold="bold" callback={ this.shiftNav.bind(this, 2) } />
                <IconBtn imgUrl={ Advice } text="投 诉" textBold="bold" callback={ this.shiftNav.bind(this, 3) } />
            </div>
        )
    }
}

export default Nav;