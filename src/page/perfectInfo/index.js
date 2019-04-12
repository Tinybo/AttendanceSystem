import React, { Component } from 'react';
import './perfectInfo.scss';
import Back from '../../components/back';
import BottomButton from '../../components/bottomButton';
import { Form, Input, Button } from 'antd';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';

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
                position: { value: '' },    // 职务
                phone: { value: '' },       // 手机号
                qq: { value: '' }           // QQ
            }
        };

        this.validate = '';                 // 表单校验函数
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
            num: Form.createFormField({ ...props.num, value: props.num.value,}),
            college: Form.createFormField({ ...props.college, value: props.college.value,}),
            department: Form.createFormField({ ...props.department, value: props.department.value,}),
            major: Form.createFormField({ ...props.major, value: props.major.value,}),
            grade: Form.createFormField({ ...props.grade, value: props.grade.value,}),
            class: Form.createFormField({ ...props.class, value: props.class.value,}),
            age: Form.createFormField({ ...props.age, value: props.age.value,}),
            position: Form.createFormField({ ...props.position, value: props.position.value,}),
            phone: Form.createFormField({ ...props.phone, value: props.phone.value,}),
            qq: Form.createFormField({ ...props.qq, value: props.qq.value,}),
        };
        },
        onValuesChange(_, values) {
        //   console.log(values);
        },
    })((props) => {
        const { getFieldDecorator } = props.form;
        // 将校验函数传递给父组件
        props.putValidate(props.form.validateFields);

        return (
            <Form layout="inline" className="formPerfect">
                <Form.Item label="姓名">
                { getFieldDecorator('name', {
                    rules: [{ required: true, message: '姓名为必填项！' }],
                })(<Input />) }
                </Form.Item>
                <Form.Item label="学号">
                { getFieldDecorator('num', {
                    rules: [{ required: true, message: '学号为必填项！' }],
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
                <Form.Item label="专业">
                { getFieldDecorator('major', {
                    rules: [{ required: true, message: '专业为必填项！' }],
                })(<Input />) }
                </Form.Item>
                <Form.Item label="年级">
                { getFieldDecorator('grade', {
                    rules: [{ required: true, message: '年级为必填项！' }],
                })(<Input />) }
                </Form.Item>
                <Form.Item label="班级">
                { getFieldDecorator('class', {
                    rules: [{ required: true, message: '班级为必填项！' }],
                })(<Input />) }
                </Form.Item>
                <Form.Item label="年龄">
                { getFieldDecorator('age', {
                    rules: [{ required: true, message: '年龄为必填项！' }],
                })(<Input />) }
                </Form.Item>
                <Form.Item label="职务">
                { getFieldDecorator('position', {
                    rules: [{ required: true, message: '职务为必填项！' }],
                })(<Input />) }
                </Form.Item>
                <Form.Item label="手机号">
                { getFieldDecorator('phone', {
                    rules: [{ required: true, message: '手机号为必填项！' }],
                })(<Input />) }
                </Form.Item>
                <Form.Item label="QQ">
                { getFieldDecorator('qq', {
                    rules: [{ required: true, message: 'QQ为必填项！' }],
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
        this.validate((err, values) => {
            if (!err) {
                console.log('完善的数据可以提交了：', this.state.fields);
                let oriData = this.state.fields;
                let userData = this.props.login;    // 登录后返回的用户信息

                actions.perfectInfo({
                    stu_id: userData.stu_id,
                    stu_name: oriData.name.value,
                    num: oriData.num.value,
                    college: oriData.college.value,
                    deparment: oriData.department.value,
                    major: oriData.major.value,
                    grade:  oriData.grade.value,
                    class: oriData.class.value,
                    age: oriData.age.value,
                    position: oriData.position.value,
                    phone: userData.phone,
                    qq: oriData.qq.value,
                    type: userData.type
                });
            } else {
                console.log('数据不合法！');
            }
        });
    }

    render () {
        const fields = this.state.fields;
        let VVV = this.PerfectInfoForm;

        return (
            <div className="perfectContainer">
                <header>
                    <span className="title">完善信息</span>
                    <Back className="backBtn" url="/auth" text="返回" />
                </header>

                <main>
                    <VVV {...fields} onChange={this.handleFormChange} putValidate={this.putValidate} />
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