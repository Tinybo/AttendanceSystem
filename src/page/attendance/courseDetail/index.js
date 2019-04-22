import React, { Component } from 'react';
import './courseDetail.scss';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';
import { hashHistory } from 'react-router';

import { Form, Input, Icon, Collapse } from 'antd';

import Header from '../../../components/header';
import NavLabel from '../../../components/navLabel';
import CourseInfo from '../../../components/courseInfo';
import StudentInfo from '../../../components/studentInfo';
import BottomButton from '../../../components/bottomButton';
import Back from '../../../components/back';
import CourseCard from '../../../components/courseCard';
import Attending from '../../../common/images/attending.png';
import Ending from '../../../common/images/ending.png';

import { toast } from '../../../common/utils/toast';
const Panel = Collapse.Panel;

/**
 * 课堂详情。
 * @author Tinybo
 * @date 2019 04 21
 */
class CourseDetail extends Component {
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
        hashHistory.push('/attendance/teacherCourse');
    }

    /**
     * 跳转至所有课堂页面。
     * @author Tinybo
     * @date 2019 04 21
     * @memberof CourseDetail
     */
    toDetail = (data) => {
        console.log('进来了。');
        hashHistory.push('/attendance/courseDetail');
    }

    /**
     * 显示课堂信息。
     * @author Tinybo
     * @date 2019 04 20
     * @memberof StudentAttendance
     */
    showCourse = (data) => {
        /* return data.map((x, index) => {
            switch (x.isFinish) {
                case 0: return (
                    <CourseCard key={ index } data={ x } iconImg={ Attending } callback={ this.toDetail } />
                ); break;
                case 1: return (
                    <CourseCard key={ index } data={ x } iconImg={ Ending } callback={ this.toDetail } />
                ); break;
                default: break;
            }
        }) */
    }

    render () {
        const data = this.props.location.query;
        const text = `
            A dog is a type of domesticated animal.
            Known for its loyalty and faithfulness,
            it can be found as a welcome guest in many households across the world.
            `;

        console.log('allCourse', data);

        return (
            <div className="courseDetailContainer">
                <header>
                    <Header btnText="返回" callback={ this.back } />
                    <NavLabel text="课堂详情" />
                </header>

                <main>
                    <div className="empty"></div>
                    <Collapse defaultActiveKey={['2']}>
                        <Panel header="课堂基本信息" key="1">
                            <CourseInfo data={ data } />
                        </Panel>
                        <Panel header="学生信息" key="2">
                            <StudentInfo data={ data } />
                        </Panel>
                        
                    </Collapse>
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
)(CourseDetail);

