import $ from 'jquery';
import { hashHistory } from 'react-router';
import { toast } from '../../common/utils/toast'; // 全局提示
import { host } from '../../common/hosts';

export const PERFECT_INFO = "PERFECT_INFO";

/**
 * 完成完善信息操作。
 * @author Tinybo
 * @date 2019 04 10
 * @param {*} data 需要保存的数据。
 */
export function perfectInfo (data) {
    return (dispatch, getState) => {
        // 调用后台登录接口。
        console.log('这就是完善信息的数据:', data);
        $.post({
            url: host + '/perfectInfo',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('完善信息接口调用成功：', res)
                if (res.code != '404') {
                    let result = res.data;
                    let oriName = '';

                    // 统一数据命名(name)
                    oriName = result.stu_name ? result.stu_name : '';
                    oriName = oriName ? oriName : result.tea_name;
                    oriName = oriName ? oriName : result.off_name;
                    oriName = oriName ? oriName : result.lea_name;
                    oriName = oriName ? oriName : result.name;

                    // 将数据保存到浏览器缓存
                    localStorage.setItem('type', result.type);
                    localStorage.setItem('userName', oriName);
                    localStorage.setItem('phone', result.phone);
                    localStorage.setItem('num', result.num);
                    localStorage.setItem('college', result.college);
                    localStorage.setItem('department', result.department);
                    localStorage.setItem('position', result.position);
                    localStorage.setItem('sex', result.sex);
                    localStorage.setItem('age', result.age);
                    if (result.type == 1) {
                        // 保存学生特有的信息
                        localStorage.setItem('major', result.major);
                        localStorage.setItem('grade', result.grade);
                        localStorage.setItem('class', result.class);
                        localStorage.setItem('qq', result.qq);
                    }

                    dispatch({
                        type: PERFECT_INFO,
                        data: {
                            ...result,
                        }
                    });

                    console.log('编辑信息:', result);
                    toast('success', '编辑信息成功！');
                    hashHistory.push('/home');
                } else {
                    toast('error', '完善信息失败！');
                    dispatch({
                        type: PERFECT_INFO,
                        data: {
                            isFinish: true
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '完善信息失败！');
                console.log('完善信息接口调用失败：', err);
                dispatch({
                    type: PERFECT_INFO,
                    data: {
                        isFinish: true
                    }
                });
            }
        });
        
    }
}