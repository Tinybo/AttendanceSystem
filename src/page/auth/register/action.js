import $ from 'jquery';
import { toast } from '../../../common/utils/toast'; // 全局提示

export const REGISTER = "REGISTER";
export const RESET_BTN = "RESET_BTN";

/**
 * 完成登录操作。
 * @author Tinybo
 * @date 2019 04 10
 * @param {*} data 需要保存的数据。
 */
export function register (data) {
    return (dispatch, getState) => {
        // 调用后台登录接口。
        $.post({
            url: 'http://10.21.13.26:3001/register',
            dataType: 'json',
            header: 'Content-type: application/json',
            data: data,
            success: (res) => {
                console.log('注册接口调用成功：', res)
                if (res.code != '404') {
                    let result = res.data;
                    toast('success', '注册成功！');
                    dispatch({
                        type: REGISTER,
                        data: {
                            ...result,
                            isRegisterFinish: true
                        }
                    });
                } else {
                    toast('error', res.msg);
                    console.log('注册接口调用失败：', res.msg);
                    dispatch({
                        type: REGISTER,
                        data: {
                            isRegisterFinish: true
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', err);
                console.log('注册接口调用失败：', err);
                dispatch({
                    type: REGISTER,
                    data: {
                        isRegisterFinish: true
                    }
                });
            }
        });
        
    }
}

/**
 * 重置登录按钮。
 * @author Tinybo
 * @date 2019 04 10
 * @param {*} data 需要保存的数据。
 */
export function resetBtn () {
    return (dispatch, getState) => {
        dispatch({
            type: RESET_BTN,
            data: {
                isRegisterFinish: false
            }
        }); 
    }
}