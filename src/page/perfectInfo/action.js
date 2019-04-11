import $ from 'jquery';

export const PERFECT_INFO = "PERFECT_INFO";

/**
 * 完成登录操作。
 * @author Tinybo
 * @date 2019 04 10
 * @param {*} data 需要保存的数据。
 */
export function perfectInfo (data) {
    return (dispatch, getState) => {
        // 调用后台登录接口。
        $.post({
            url: 'http://localhost:3001/perfectInfo',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('登录接口调用成功：', res)
                if (res.code != '404') {
                    let result = res.data;
                    dispatch({
                        type: PERFECT_INFO,
                        data: {
                            ...result,
                            isFinish: true
                        }
                    });
                } else {
                    dispatch({
                        type: PERFECT_INFO,
                        data: {
                            isFinish: true
                        }
                    });
                }
            },
            error: (err) => {
                console.log('登录接口调用失败：', err);
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