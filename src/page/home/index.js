import React, { Component } from 'react';
import './home.scss';
import { hashHistory } from 'react-router';

import { toast } from '../../common/utils/toast';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Left from './left';
import Middle from './middle';
import Right from './right';


/**
 * 模版组件。
 * @author Tinybo
 * @date 2018 12 11
 */
class Home extends Component {
    constructor () {
        super();

        this.state = {
            activeNav: 2
        };
    }

    /**
     * 注销程序。
     * @author Tinybo
     * @date 2019 04 13
     */
    logout = () => {
        // 清空所有用户信息
        localStorage.clear();

        toast('success', '注销成功！');
        hashHistory.push('/auth');
        console.log('已经退出了。');
    }

    /**
     * 切换导航。
     * @author Tinybo
     * @date 2019 04 13
     */
    shiftNav = (num) => {
        this.setState({
            activeNav: num
        });
        console.log('当前导航：', num);
    };

    /**
     * 渲染中间主体内容。
     * @author Tinybo
     * @date 2019 04 13
     */
    renderContent = (active) => {
        switch (active) {
            case 1: return (<Left />); break;
            case 2: return (<Middle />); break;
            case 3: return (<Right />); break;
            default: return (<Left />); break;
        }
    }

    render () {
        return (
            <div className="homeContainer">
                <header>
                    <Header callback={ this.logout } />
                </header>

                <main>
                    { this.renderContent(this.state.activeNav) }
                </main>

                <footer>
                    <Footer callback={ this.shiftNav } />
                </footer>
            </div>
        )
    }
}

export default Home;