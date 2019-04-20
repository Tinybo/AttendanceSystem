import React, { Component } from 'react';
import './studentAttend.scss';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import * as actions from './action';
import { hashHistory } from 'react-router';

import Header from '../../../components/header';
import NavLabel from '../../../components/navLabel';
import BottomButton from '../../../components/bottomButton';

/**
 * 签到功能。
 * @author Tinybo
 * @date 2019 04 19
 */
class StudentAttendance extends Component {
    constructor () {
        super();
    }

    submit = () => {
        console.log('提交课堂表。');
    }

    /**
     * 返回到主页。
     * @author Tinybo
     * @date 2019 04 14
     * @memberof Leave
     */
    back = () => {
        hashHistory.push('/home');
        console.log('已经点击返回了。');
    }

    render () {
        return (
            <div className="stuAttendContainer">
                <header>
                    <Header btnText="返回" callback={ this.back } />
                    <NavLabel text="填写课堂表" />
                </header>

                <main>
                    学生表单内容
                </main>

                <footer>
                    <BottomButton text="确认提交" callback={this.submit} />
                </footer>
            </div>
        )
    }
}

export default StudentAttendance;