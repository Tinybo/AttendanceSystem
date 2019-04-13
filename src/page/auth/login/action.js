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
            url: 'http://10.21.13.26:3001/login',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('登录接口调用成功：', res)
                if (res.code != '404') {
                    let result = res.data;
                    let oriId = '';
                    let oriName = '';

                    // 统一数据命名(id)
                    oriId = result.stu_id ? result.stu_id : '';
                    oriId = oriId ? oriId : result.tea_id;
                    oriId = oriId ? oriId : result.off_id;
                    oriId = oriId ? oriId : result.lea_id;

                    // 统一数据命名(name)
                    oriName = result.stu_name ? result.stu_name : '';
                    oriName = oriName ? oriName : result.tea_name;
                    oriName = oriName ? oriName : result.off_name;
                    oriName = oriName ? oriName : result.lea_name;

                    // 将数据保存到浏览器缓存
                    localStorage.setItem('type', result.type);
                    localStorage.setItem('userId', oriId);
                    localStorage.setItem('userName', oriName);
                    localStorage.setItem('phone', result.phone);
                    localStorage.setItem('num', result.num);
                    localStorage.setItem('college', result.college);

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