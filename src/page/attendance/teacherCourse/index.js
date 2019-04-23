import React, { Component } from 'react';
import './teacherCourse.scss';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';
import { hashHistory } from 'react-router';

import { Form, Input, Icon } from 'antd';
import Header from '../../../components/header';
import NavLabel from '../../../components/navLabel';
import BottomButton from '../../../components/bottomButton';
import Back from '../../../components/back';
import CourseCard from '../../../components/courseCard';
import Attending from '../../../common/images/attending.png';
import Ending from '../../../common/images/ending.png';

import { toast } from '../../../common/utils/toast';

/**
 * 点到功能。
 * @author Tinybo
 * @date 2019 04 21
 */
class TeacherCourse extends Component {
    constructor () {
        super();

        this.state = {
        };
    }

    // 设置初始值
    componentWillMount () {
        let userId = localStorage.getItem('userId');
        let num = localStorage.getItem('num');
        let college = localStorage.getItem('college');
        let department = localStorage.getItem('department');
        let phone = localStorage.getItem('phone');

        const { actions } = this.props;
        actions.getAllCourse({
            tea_id: userId
        });
    }

    /**
     * 返回到主页。
     * @author Tinybo
     * @date 2019 04 14
     * @memberof Leave
     */
    back = () => {
        hashHistory.push('/home');
    }

    /**
     * 新建课堂表。
     * @author Tinybo
     * @date 2019 04 21
     * @memberof Leave
     */
    newCreate = () => {
        hashHistory.push('/attendance/teacherAttend');
    }

    /**
     * 跳转至所有课堂页面。
     * @author Tinybo
     * @date 2019 04 21
     * @memberof StudentAttendance
     */
    toDetail = (data) => {
        console.log('进来了。');
        hashHistory.push({
            pathname: '/attendance/courseDetail',
            query: data
        });
    }

    /**
     * 显示课堂信息。
     * @author Tinybo
     * @date 2019 04 20
     * @memberof StudentAttendance
     */
    showCourse = (data) => {
        return data.map((x, index) => {
            switch (x.isFinish) {
                case 0: return (
                    <CourseCard key={ index } data={ x } iconImg={ Attending } onClick={ this.toDetail.bind(this, x) } />
                ); break;
                case 1: return (
                    <CourseCard key={ index } data={ x } iconImg={ Ending } onClick={ this.toDetail.bind(this, x) } />
                ); break;
                default: break;
            }
        })
    }

    render () {
        const { allCourse } = this.props.teacherCourse;

        return (
            <div className="teaAttendContainer">
                <header>
                    <Header btnText="返回" callback={ this.back } />
                    <NavLabel text="课堂记录" />
                </header>

                <main>
                    <div className="empty"></div>
                    <div className="createContainer animated fadeInRight" onClick={ this.newCreate }>
                        <Icon type="plus" style={{ color: 'white' }} />
                    </div>

                    <div className="courseCard">
                        { this.showCourse(allCourse) }
                    </div>
                </main>

                <footer>
                </footer>
            </div>
        )
    }
}

export default connect(
    (state) => state, 
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(TeacherCourse);
