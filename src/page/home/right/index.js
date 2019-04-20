import React, { Component } from 'react';
import './right.scss';
import Avatar from '../../../common/images/avatar.png';
import NavLabel from '../../../components/navLabel';
import DetailItem from '../../../components/detailItem';
import BottomButton from '../../../components/bottomButton';
import { hashHistory } from 'react-router';
import Bg from '../../../common/images/zhuzi.png';

/**
 * 个人中心组件。
 * @author Tinybo
 * @date 2019 04 19
 */
class Right extends Component {
    constructor () {
        super();

        this.state = {
            name: '',
            college: '', 
            department: '',
            major: '',
            grade: '',
            class: '',
            qq: '',
            sex: '',
            age: '',
            position: '',
            phone: '',
            type: '',
            num: ''
        }
    }

    componentWillMount () {
        let name = localStorage.getItem('userName');
        let college = localStorage.getItem('college');
        let department = localStorage.getItem('department');
        let major = localStorage.getItem('major');
        let grade = localStorage.getItem('grade');
        let Class = localStorage.getItem('class');
        let qq = localStorage.getItem('qq');
        let sex = localStorage.getItem('sex');
        let age = localStorage.getItem('age');
        let position = localStorage.getItem('position');
        let phone = localStorage.getItem('phone');
        let type = localStorage.getItem('type');
        let num = localStorage.getItem('num');

        this.setState({
            name: name,
            college: college, 
            department: department,
            major: major,
            grade: grade,
            class: Class,
            qq: qq,
            sex: sex,
            age: age,
            position: position,
            phone: phone,
            type: type,
            num: num
        });
    }

    /**
     * 跳转至完善信息界面。
     * @author Tinybo
     * @date 2019 04 19
     * @memberof Right
     */
    toEdit = () => {
        hashHistory.push({
            pathname: '/perfectInfo',
            query: this.state
        });
    }

    render () {
        return (
            <div className="rightContainer">
                <header>
                    <img src={ Avatar } alt="avatar" width="30" height="30" />
                    <span>{ this.state.name }</span>
                </header>
                <NavLabel text="基本信息" />

                <main className="animated fadeIn">
                    <img src={ Bg } alt="background" width="365" height="150"/>
                    <DetailItem label="姓名" value={ this.state.name } />
                    <DetailItem label="大学" value={ this.state.college } />
                    <DetailItem label="系别" value={ this.state.department } />
                    { 
                        this.state.type == '1' ? 
                        (
                            <div>
                                <DetailItem label="学号" value={ this.state.num } />
                                <DetailItem label="专业" value={ this.state.major } />
                                <DetailItem label="年级" value={ this.state.grade } />
                                <DetailItem label="班级" value={ this.state.Class } />
                                <DetailItem label="职位" value={ this.state.position } />
                            </div>
                        ) : (
                            <div>
                                <DetailItem label="工号" value={ this.state.num } />
                                <DetailItem label="职称" value={ this.state.position } />
                            </div>
                        )
                    }
                    <DetailItem label="性别" value={ this.state.sex } />
                    <DetailItem label="年龄" value={ this.state.age } />
                    <DetailItem label="手机" value={ this.state.phone } />
                </main>

                <footer>
                    <BottomButton text="修改信息" callback={ this.toEdit } />
                </footer>
            </div>
        )
    }
}

export default Right;