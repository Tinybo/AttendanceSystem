import React, { Component } from 'react';
import './perfectInfo.scss';
import Back from '../../components/back';
import BottomButton from '../../components/bottomButton';
import { Form, Input } from 'antd';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';

import { toast } from '../../common/utils/toast';

/**
 * 模版组件。
 * @author Tinybo
 * @date 2018 12 11
 */
class PerfectInfo extends Component {
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
            },
            isEdit: false,                  // 是否为编辑信息
        };

        this.validate = '';                 // 表单校验函数
    }

    // 给表单赋默认值
    componentWillMount () {
        let data = this.props.location.query;
        if (data.phone) {
            this.setState({
                fields: Object.assign(this.state.fields, {
                    name: { value: data.name },
                    college: { value: data.college }, 
                    department: { value: data.department },
                    major: { value: data.major },
                    grade: { value: data.grade },
                    class: { value: data.Class },
                    qq: { value: data.qq },
                    sex: { value: data.sex },
                    age: { value: data.age },
                    position: { value: data.position },
                    phone: { value: data.phone },
                    num: { value: data.num },
                }),
                isEdit: true
            });
        } else {
            const oriData = this.props.login;

            this.setState({
                fields: Object.assign(this.state.fields, {
                    phone: { value: oriData.phone }
                })
            });
        }
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
                <Form.Item label="年龄">
                    { getFieldDecorator('age', {
                        rules: [{ required: true, message: '年龄为必填项！' }],
                    })(<Input />) }
                </Form.Item>
                <Form.Item label="性别">
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
                let userData = this.props.login;    // 登录后返回的用户信息
                console.log('登录后返回的数据：', userData);

                switch (type) {
                    case '1': actions.perfectInfo({
                        stu_id: oriId,
                        stu_name: oriData.name.value,
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
                        type: type
                    }); break;
                    default: actions.perfectInfo({
                        id: oriId,
                        name: oriData.name.value,
                        num: oriData.num.value,
                        college: oriData.college.value,
                        department: oriData.department.value,
                        age: oriData.age.value,
                        sex: oriData.sex.value,
                        position: oriData.position.value,
                        phone: oriData.phone.value,
                        type: type
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
            <div className="perfectContainer">
                <header>
                    <span className="title">编辑信息</span>
                    <Back className="backBtn" url={ this.state.isEdit ? "/home" : "/auth" } text="返回" />
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
)(PerfectInfo);