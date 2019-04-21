import React, { Component } from 'react';
import './teacherAttend.scss';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';
import { hashHistory } from 'react-router';

import Header from '../../../components/header';
import NavLabel from '../../../components/navLabel';
import BottomButton from '../../../components/bottomButton';
import Back from '../../../components/back';
import { Form, Input } from 'antd';

import { toast } from '../../../common/utils/toast';

/**
 * 点到功能。
 * @author Tinybo
 * @date 2019 04 19
 */
class TeacherAttendance extends Component {
    constructor () {
        super();

        this.state = {
            fields: {
                name: { value: '' },        // 课堂名称
                tea_name: { value: '' },    // 教师姓名
                num: { value: '' },         //  工号
                college: { value: '' },     // 学校
                department: { value: '' },  // 系别
                phone: { value: '' },       // 手机号
                should_num: { value: '' },  // 应到人数
                real_num: { value: '' },    // 实到人数
                late_num: { value: '' },    // 迟到人数
                ask_leave_num: { value: '' },    // 请假人数
                truancy_num: { value: '' },      // 旷课人数
                leave_early_num: { value: '' },  // 早退人数
                address: { value: '' },     // 地点
                note: { value: '' },        // 备注
    
                major: { value: '' },       // 专业
                grade: { value: '' },       // 年级
                class: { value: '' },       // 班级                
            },
            isCreate: false,                // 课堂是否创建成功
        };
    }

    // 设置初始值
    componentWillMount () {
        let tea_name = localStorage.getItem('userName');
        let num = localStorage.getItem('num');
        let college = localStorage.getItem('college');
        let department = localStorage.getItem('department');
        let phone = localStorage.getItem('phone');

        this.setState({
            fields: Object.assign(this.state.fields, {
                tea_name: { value: tea_name },
                college: { value: college }, 
                department: { value: department },
                phone: { value: phone },
                num: { value: num },
            })
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
        console.log('已经点击返回了。');
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
            return {
                name: Form.createFormField({ ...props.name, value: props.name.value,}),
                tea_name: Form.createFormField({ ...props.tea_name, value: props.tea_name.value,}),
                num: Form.createFormField({ ...props.num, value: props.num.value,}),
                college: Form.createFormField({ ...props.college, value: props.college.value,}),
                department: Form.createFormField({ ...props.department, value: props.department.value,}),
                major: Form.createFormField({ ...props.major, value: props.major.value,}),
                grade: Form.createFormField({ ...props.grade, value: props.grade.value,}),
                class: Form.createFormField({ ...props.class, value: props.class.value,}),
                phone: Form.createFormField({ ...props.phone, value: props.phone.value,}),
                should_num: Form.createFormField({ ...props.should_num, value: props.should_num.value,}),
                real_num: Form.createFormField({ ...props.real_num, value: props.real_num.value,}),
                late_num: Form.createFormField({ ...props.late_num, value: props.late_num.value,}),
                ask_leave_num: Form.createFormField({ ...props.ask_leave_num, value: props.ask_leave_num.value,}),
                truancy_num: Form.createFormField({ ...props.truancy_num, value: props.truancy_num.value,}),
                leave_early_num: Form.createFormField({ ...props.leave_early_num, value: props.leave_early_num.value,}),
                address: Form.createFormField({ ...props.address, value: props.address.value,}),
                note: Form.createFormField({ ...props.note, value: props.note.value,}),
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
                <Form.Item label="课堂名">
                    { getFieldDecorator('name', {
                        rules: [{ required: true, message: '课堂名为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="教师名">
                    { getFieldDecorator('tea_name', {
                        rules: [{ required: true , message: '教师名为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="工号">
                    { getFieldDecorator('num', {
                        rules: [{ required: true, message: '工号为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="大学">
                    { getFieldDecorator('college', {
                        rules: [{ required: true, message: '大学为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="系别" style = {{ display: this.state.isCreate ? 'block' : 'none' }}>
                    { getFieldDecorator('department', {
                        rules: [{ required: this.state.isCreate ? true : false, message: '系别为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="专业" style = {{ display: this.state.isCreate ? 'block' : 'none' }}>
                    { getFieldDecorator('major', {
                        rules: [{ required: this.state.isCreate ? true : false, message: '专业为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="年级" style = {{ display: this.state.isCreate ? 'block' : 'none' }}>
                    { getFieldDecorator('grade', {
                        rules: [{ required: this.state.isCreate ? true : false, message: '年级为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="班级" style = {{ display: this.state.isCreate ? 'block' : 'none' }}>
                    { getFieldDecorator('class', {
                        rules: [{ required: this.state.isCreate ? true : false, message: '班级为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="手机号">
                    { getFieldDecorator('phone', {
                        rules: [{ required: true, message: '手机号为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="应到人数" style = {{ display: this.state.isCreate ? 'block' : 'none' }}>
                    { getFieldDecorator('should_num', {
                        rules: [{ required: this.state.isCreate ? true : false, message: '应到人数为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="实到人数" style = {{ display: this.state.isCreate ? 'block' : 'none' }}>
                    { getFieldDecorator('real_num', {
                        rules: [{ required: this.state.isCreate ? true : false, message: '实到人数为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="请假人数" style = {{ display: this.state.isCreate ? 'block' : 'none' }}>
                    { getFieldDecorator('ask_leave_num', {
                        rules: [{ required: this.state.isCreate ? true : false, message: '请假人数为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="旷课人数" style = {{ display: this.state.isCreate ? 'block' : 'none' }}>
                    { getFieldDecorator('truancy_num', {
                        rules: [{ required: this.state.isCreate ? true : false, message: '旷课人数为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="早退人数" style = {{ display: this.state.isCreate ? 'block' : 'none' }}>
                    { getFieldDecorator('leave_early_num', {
                        rules: [{ required: this.state.isCreate ? true : false, message: '早退人数为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="迟到人数" style = {{ display: this.state.isCreate ? 'block' : 'none' }}>
                    { getFieldDecorator('late_num', {
                        rules: [{ required: this.state.isCreate ? true : false, message: '迟到人数为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="上课地点">
                    { getFieldDecorator('address', {
                        rules: [{ required: true, message: '上课地点为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="备注" style = {{ display: this.state.isCreate ? 'block' : 'none' }}>
                    { getFieldDecorator('note', {
                        rules: [{ required: false, message: '职务为必填项！' }],
                    })(<Input />) }
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
        let type = localStorage.getItem('type');
        let oriId = localStorage.getItem('userId');

        this.validate((err, values) => {
            if (!err) {
                console.log('完善的数据可以提交了：', this.state.fields);
                let oriData = this.state.fields;
                let userId = localStorage.getItem('userId');
                let position = localStorage.getItem('position');

                actions.createCourse({
                    userId: userId,
                    name: oriData.name.value,
                    tea_name: oriData.tea_name.value,
                    num: oriData.num.value,
                    college: oriData.college.value,
                    should_num: oriData.should_num.value,       // 应到人数
                    real_num: oriData.real_num.value,           // 实到人数
                    late_num: oriData.late_num.value,           // 迟到人数
                    ask_leave_num: oriData.ask_leave_num.value, // 请假人数
                    truancy_num: oriData.truancy_num.value,          // 旷课人数
                    leave_early_num: oriData.leave_early_num.value,  // 早退人数
                    address: oriData.address.value,                  // 地点      
                    position: position,
                    phone: oriData.phone.value,
                });
            } else {
                let errMsg = '';
                for (const key in err) {
                    err[key].errors.forEach(x => {
                        toast('warning', x.message);
                    })
                }
                // toast('warning', errMsg);
                console.log('数据不合法！');
            }
        });
    }

    render () {
        const fields = this.state.fields;
        let UserForm = this.PerfectInfoForm;
        let type = localStorage.getItem('type');

        console.log('用户类型：', type);

        return (
            <div className="teaAttendContainer">
                <header>
                    <Header btnText="返回" callback={ this.back } />
                    <NavLabel text="填写课堂表" />
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
)(TeacherAttendance);