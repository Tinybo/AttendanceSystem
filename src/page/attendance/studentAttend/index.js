import React, { Component } from 'react';
import './studentAttend.scss';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';
import { hashHistory } from 'react-router';
import { toast } from '../../../common/utils/toast';

import { Input } from 'antd';

import Header from '../../../components/header';
import NavLabel from '../../../components/navLabel';
import BottomButton from '../../../components/bottomButton';
import CourseCard from '../../../components/courseCard';
import HasAttend from '../../../common/images/hasArrived.png';
import NotAttend from '../../../common/images/notArrive.png';

const Search = Input.Search;

/**
 * 签到功能。
 * @author Tinybo
 * @date 2019 04 19
 */
class StudentAttendance extends Component {
    constructor () {
        super();

        this.state = {
            courseId: ''
        }
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

    /**
     * 根据课堂ID搜索课堂。
     * @author Tinybo
     * @date 2019 04 20
     * @memberof StudentAttendance
     */
    searchCourse = (id) => {
        if (!id) {
            toast('warning', '请输入课堂ID再搜索！');
            return;
        }

        const { actions } = this.props;
        actions.searchCourse({
            courseId: id
        });
    }

    isAttend = () => {
        toast('success', '已经签到。');
        console.log('已经签到。');
    }

    /**
     * 显示课堂信息。
     * @author Tinybo
     * @date 2019 04 20
     * @memberof StudentAttendance
     */
    showCourse = (data) => {
        switch (data.isFinish) {
            case 0: return (
                <CourseCard data={ data } buttonText=" 签 到 " buttonCallback={ this.isAttend } />
            ); break;
            case 1: return (
                <CourseCard data={ data } iconImg={ HasAttend } />
            ); break;
            case 2: return (
                <CourseCard data={ data } iconImg={ NotAttend } />
            ); break;
            default: break;
        }
    }

    render () {
        const { courseData } = this.props.studentAttend

        return (
            <div className="stuAttendContainer">
                <header>
                    <Header btnText="返回" callback={ this.back } />
                    <NavLabel text="课堂签到" />
                </header>

                <main>
                    <Search
                        placeholder="请输入课程ID"
                        onSearch={ value => this.searchCourse(value) }
                        enterButton
                    />

                    <div className="searchResult animated fadeInUp">
                        { this.showCourse(courseData) }
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
)(StudentAttendance);

// <BottomButton text="确认提交" callback={this.submit} />
