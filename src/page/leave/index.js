import React, { Component } from 'react';
import './leave.scss';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';
import { hashHistory } from 'react-router';

import Header from '../../components/header';
import NavLabel from '../../components/navLabel';
import Back from '../../components/back';
import BottomButton from '../../components/bottomButton';
import { Form, Input, DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import { toast } from '../../common/utils/toast';

const { TextArea } = Input;

/**
 * 填写请假条。
 * @author Tinybo
 * @date 2019 04 16
 */
class Leave extends Component {
    constructor () {
        super();

        this.state = {
            fields: {
                name: { value: '' },        // 姓名
                num: { value: '' },         // 学号
                college: { value: '' },     // 学校
                department: { value: '' },  // 系别
                major: { value: '' },       // 专业
                grade: { value: '' },       // 年级
                class: { value: '' },       // 班级
                age: { value: '' },         // 年龄
                sex: { value: '' },         // 性别
                position: { value: '' },    // 职务
                phone: { value: '' },       // 手机号
                qq: { value: '' },          // QQ
                reason: { value: '' },      // 请假事由
                startTime: { value: null }, // 开始日期
                endTime: { value: null },   // 结束日期
                startMoment: { value: null },   // 开始时间
                endMoment: { value: null },     // 结束时间
            }
        };

        this.validate = '';                 // 表单校验函数
    }

    // 给表单赋默认值
    componentWillMount () {
        const oriData = this.props.login;

        // 获取用户的登录信息
        let type = localStorage.getItem('type');
        let userId = localStorage.getItem('userId');
        let userName = localStorage.getItem('userName');
        let phone = localStorage.getItem('phone');
        let num = localStorage.getItem('num');
        let college = localStorage.getItem('college');
        let department = localStorage.getItem('department');
        let position = localStorage.getItem('position');
        // 保存学生特有的信息
        let major = localStorage.getItem('major');
        let grade = localStorage.getItem('grade');
        let Class = localStorage.getItem('class');
        let qq = localStorage.getItem('qq');
        let sex = localStorage.getItem('sex');
        let age = localStorage.getItem('age');

        this.setState({
            fields: Object.assign(this.state.fields, {
                name: { value: userName },          // 姓名
                num: { value: num },                // 学号
                college: { value: college },        // 学校
                department: { value: department },  // 系别
                major: { value: major },            // 专业
                grade: { value: grade },            // 年级
                class: { value: Class },            // 班级
                age: { value: age },                // 年龄
                sex: { value: sex },                // 性别
                position: { value: position },      // 职务
                phone: { value: phone },            // 手机号
                qq: { value: qq },                  // QQ
            })
        });
    }

    /**
     * React官方表单组件，必须放组件外。
     * @author Tinybo
     * @date 2019 04 11
     */
    PerfectInfoForm = Form.create({
        name: 'perfect',
        onFieldsChange(props, changedFields) {
            props.onChange(changedFields);
        },
        mapPropsToFields(props) {
            // 学生
            if (props.userType == 1) {
                return {
                    name: Form.createFormField({ ...props.name, value: props.name.value,}),
                    num: Form.createFormField({ ...props.num, value: props.num.value,}),
                    college: Form.createFormField({ ...props.college, value: props.college.value,}),
                    department: Form.createFormField({ ...props.department, value: props.department.value,}),
                    major: Form.createFormField({ ...props.major, value: props.major.value,}),
                    grade: Form.createFormField({ ...props.grade, value: props.grade.value,}),
                    class: Form.createFormField({ ...props.class, value: props.class.value,}),
                    age: Form.createFormField({ ...props.age, value: props.age.value,}),
                    sex: Form.createFormField({ ...props.sex, value: props.sex.value,}),
                    position: Form.createFormField({ ...props.position, value: props.position.value,}),
                    phone: Form.createFormField({ ...props.phone, value: props.phone.value,}),
                    qq: Form.createFormField({ ...props.qq, value: props.qq.value,}),
                    reason: Form.createFormField({ ...props.reason, value: props.reason.value,}),
                    startTime: Form.createFormField({ ...props.startTime, value: props.startTime.value,}),
                    endTime: Form.createFormField({ ...props.endTime, value: props.endTime.value,}),
                    startMoment: Form.createFormField({ ...props.startMoment, value: props.startMoment.value,}),
                    endMoment: Form.createFormField({ ...props.endMoment, value: props.endMoment.value,}),
                }; 
            }
            // 教师、学工办、学院领导
            return {
                name: Form.createFormField({ ...props.name, value: props.name.value,}),
                num: Form.createFormField({ ...props.num, value: props.num.value,}),
                college: Form.createFormField({ ...props.college, value: props.college.value,}),
                department: Form.createFormField({ ...props.department, value: props.department.value,}),
                age: Form.createFormField({ ...props.age, value: props.age.value,}),
                sex: Form.createFormField({ ...props.sex, value: props.sex.value,}),
                position: Form.createFormField({ ...props.position, value: props.position.value,}),
                phone: Form.createFormField({ ...props.phone, value: props.phone.value,}),
                reason: Form.createFormField({ ...props.reason, value: props.reason.value,}),
                startTime: Form.createFormField({ ...props.startTime, value: props.startTime.value,}),
                endTime: Form.createFormField({ ...props.endTime, value: props.endTime.value,}),
                startMoment: Form.createFormField({ ...props.startMoment, value: props.startMoment.value,}),
                endMoment: Form.createFormField({ ...props.endMoment, value: props.endMoment.value,}),
            };
        },
        onValuesChange(_, values) {
        //   console.log(values);
        },
    })((props) => {
        const { getFieldDecorator } = props.form;
        // 将校验函数传递给父组件
        props.putValidate(props.form.validateFields);
        let type = props.userType;  // 用户类型

        return (
            <Form layout="inline" className="formPerfect animated fadeInRight">
                <Form.Item label="姓名">
                    { getFieldDecorator('name', {
                        rules: [{ required: true, message: '姓名为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="学号" style = {{ display: type == 1 ? 'block' : 'none' }}>
                    { getFieldDecorator('num', {
                        rules: [{ required: true , message: '学号为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="工号" style = {{ display: type == 1 ? 'none' : 'block' }}>
                    { getFieldDecorator('num', {
                        rules: [{ required: true, message: '工号为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="大学">
                    { getFieldDecorator('college', {
                        rules: [{ required: true, message: '大学为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="系别">
                    { getFieldDecorator('department', {
                        rules: [{ required: true, message: '系别为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="专业" style = {{ display: type == 1 ? 'block' : 'none' }}>
                    { getFieldDecorator('major', {
                        rules: [{ required: type == 1 ? true : false, message: '专业为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="年级" style = {{ display: type == 1 ? 'block' : 'none' }}>
                    { getFieldDecorator('grade', {
                        rules: [{ required: type == 1 ? true : false, message: '年级为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="班级" style = {{ display: type == 1 ? 'block' : 'none' }}>
                    { getFieldDecorator('class', {
                        rules: [{ required: type == 1 ? true : false, message: '班级为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="年龄" style = {{ display: type == 1 ? 'block' : 'none' }}>
                    { getFieldDecorator('age', {
                        rules: [{ required: true, message: '年龄为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="性别" style = {{ display: type == 1 ? 'block' : 'none' }}>
                    { getFieldDecorator('sex', {
                        rules: [{ required: true, message: '性别为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="职务" style = {{ display: type == 1 ? 'block' : 'none' }}>
                    { getFieldDecorator('position', {
                        rules: [{ required: true, message: '职务为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="最高职称" style = {{ display: type == 1 ? 'none' : 'block' }}>
                    { getFieldDecorator('position', {
                        rules: [{ required: true, message: '最高职称为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="手机号">
                    { getFieldDecorator('phone', {
                        rules: [{ required: true, message: '手机号为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="QQ" style = {{ display: type == 1 ? 'block' : 'none' }}>
                    { getFieldDecorator('qq', {
                        rules: [{ required: type == 1 ? true : false, message: 'QQ为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="开始请假">
                    { getFieldDecorator('startTime', {
                        rules: [{ required: true, message: '开始日期为必填项！' }],
                    })(<DatePicker placeholder="开始日期" />) }
                    { getFieldDecorator('startMoment', {
                        rules: [{ required: true, message: '开始时间为必填项！' }],
                    })(<TimePicker  placeholder="开始时间" />) }
                </Form.Item>
                
                <Form.Item label="结束请假">
                    { getFieldDecorator('endTime', {
                        rules: [{ required: true, message: '结束日期为必填项！' }],
                    })(<DatePicker placeholder="结束日期" />) }
                    { getFieldDecorator('endMoment', {
                        rules: [{ required: true, message: '结束时间为必填项！' }],
                    })(<TimePicker placeholder="结束时间" />) }
                </Form.Item>
                <Form.Item label="请假事由">
                    { getFieldDecorator('reason', {
                        rules: [{ required: true, message: '请假事由为必填项！' }],
                    })(<TextArea rows={4} />) }
                </Form.Item> 
            </Form>
        );
    });

    /**
     * 实时同步表单数据。
     * @author Tinybo
     * @date 2019 04 11
     */
    handleFormChange = (changedFields) => {
        this.setState(({ fields }) => ({
          fields: { ...fields, ...changedFields },
        }));
    }

    /**
     * 保存校验函数。
     * @author Tinybo
     * @date 2019 04 11
     */
    putValidate = (validate) => {
        this.validate = validate;
    }

    /**
     * 提交完善信息。
     * @author Tinybo
     * @date 2019 04 11
     */
    submit = () => {
        const { actions } = this.props;
        let type = localStorage.getItem('type');  // 用户类型

        this.validate((err, values) => {
            if (!err) {
                console.log('请假的数据可以提交了：', this.state.fields);
                let oriData = this.state.fields;
                let oriId = localStorage.getItem('userId');

                switch (type) {
                    case '1': actions.leave({
                        id: oriId,
                        name: oriData.name.value,
                        num: oriData.num.value,
                        college: oriData.college.value,
                        department: oriData.department.value,
                        major: oriData.major.value,
                        grade:  oriData.grade.value,
                        class: oriData.class.value,
                        age: oriData.age.value,
                        sex: oriData.sex.value,
                        position: oriData.position.value,
                        phone: oriData.phone.value,
                        qq: oriData.qq.value,
                        type: type,
                        reason: oriData.reason.value,
                        startTime: moment(oriData.startTime.value).format("YYYY-MM-DD"),
                        endTime: moment(oriData.endTime.value).format("YYYY-MM-DD"),
                        startMoment: moment(oriData.startMoment.value).format("hh:mm:ss"),
                        endMoment: moment(oriData.endMoment.value).format("hh:mm:ss"),
                    }); break;
                    default: actions.leave({
                        id: oriId,
                        name: oriData.name.value,
                        num: oriData.num.value,
                        college: oriData.college.value,
                        department: oriData.department.value,
                        age: oriData.age.value,
                        sex: oriData.sex.value,
                        position: oriData.position.value,
                        phone: oriData.phone.value,
                        type: type,
                        reason: oriData.reason.value,
                        startTime: moment(oriData.startTime.value).format("YYYY-MM-DD"),
                        endTime: moment(oriData.endTime.value).format("YYYY-MM-DD"),
                        startMoment: moment(oriData.startMoment.value).format("h:mm:ss"),
                        endMoment: moment(oriData.endMoment.value).format("h:mm:ss"),
                    }); break;
                } 
            } else {
                let errMsg = '';
                for (const key in err) {
                    err[key].errors.forEach(x => {
                        toast('warning', x.message);
                    })
                }
                // toast('warning', errMsg);
                console.log('数据不合法！', err);
            }
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
        console.log('已经点击返回了。');
    }

    render () {
        const fields = this.state.fields;
        let UserForm = this.PerfectInfoForm;
        // const { type } = this.props.login;
        let type = localStorage.getItem('type');

        console.log('用户类型：', type);

        return (
            <div className="leaveContainer">
                <header>
                    <Header btnText="返回" callback={ this.back } />
                    <NavLabel text="填写请假条" />
                </header>

                <main>
                    <UserForm {...fields} onChange={this.handleFormChange} putValidate={this.putValidate} userType={ type } />
                </main>

                <footer>
                    <BottomButton text="确认提交" callback={this.submit} />
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
)(Leave);