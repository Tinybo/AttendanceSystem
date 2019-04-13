import React, { Component } from 'react';
import './footer.scss';
import { Icon } from 'antd';
import Mes0 from '../../common/images/mes0.png';
import Mes1 from '../../common/images/mes1.png';
import Home0 from '../../common/images/home0.png';
import Home1 from '../../common/images/home1.png';
import Me0 from '../../common/images/me0.png';
import Me1 from '../../common/images/me1.png';

import IconBtn from '../../components/iconBtn';

/**
 * 底部导航栏组件。
 * @author Tinybo
 * @date 2019 04 13
 */
class Footer extends Component {
    constructor () {
        super();

        this.state = {
            activeNav: 1
        }
    }

    /**
     * 切换导航。
     * @author Tinybo
     * @date 2019 04 13
     */
    shiftNav = (num, e) => {
        const { callback } = this.props;
        this.setState({
            activeNav: num
        });
        callback(num);
    };

    render () {
        const { callback } = this.props;
        let Left = this.state.activeNav ==  1 ? <IconBtn imgUrl={ Mes1 } text="消 息" textSize="10px" callback={ this.shiftNav.bind(this, 1) } /> : <IconBtn imgUrl={ Mes0 } callback={ this.shiftNav.bind(this, 1) } />
        let Middle = this.state.activeNav ==  2 ? <IconBtn imgUrl={ Home1 } text="主 页" textSize="10px" callback={ this.shiftNav.bind(this, 2) } /> : <IconBtn imgUrl={ Home0 } callback={ this.shiftNav.bind(this, 2) } />
        let Right = this.state.activeNav ==  3 ? <IconBtn imgUrl={ Me1 } text="我 的" textSize="10px" callback={ this.shiftNav.bind(this, 3) } /> : <IconBtn imgUrl={ Me0 } callback={ this.shiftNav.bind(this, 3) } />

        return (
            <div className="footerContainer">
                <div>{ Left }</div>
                <div>{ Middle }</div>
                <div>{ Right }</div>  
            </div>
        )
    }
}

export default Footer;