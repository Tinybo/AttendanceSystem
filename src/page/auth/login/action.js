import $ from 'jquery';

export const LOGIN = "LOGIN";
export const RESET_BTN = "RESET_BTN";

/**
 * 完成登录操作。
 * @author Tinybo
 * @date 2019 04 10
 * @param {*} data 需要保存的数据。
 */
export function login (data) {
    return (dispatch, getState) => {
        // 调用后台登录接口。
        $.get({
            url: 'http://localhost:3001/login',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('登录接口调用成功：', res)
                if (res.code != '404') {
                    let result = res.data;
                    dispatch({
                        type: LOGIN,
                        data: {
                            ...result,
                            isLoginFinish: true
                        }
                    });
                } else {
                    dispatch({
                        type: LOGIN,
                        data: {
                            isLoginFinish: true
                        }
                    });
                }
            },
            error: (err) => {
                console.log('登录接口调用失败：', err);
                dispatch({
                    type: LOGIN,
                    data: {
                        isLoginFinish: true
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
                isLoginFinish: false
            }
        }); 
    }
}