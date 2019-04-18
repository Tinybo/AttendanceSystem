import $ from 'jquery';
import { host } from '../../../common/hosts';
import { toast } from '../../../common/utils/toast';
import { hashHistory } from 'react-router';

export const GET_ALL_LEAVE = "GET_ALL_LEAVE";
export const PASS_LEAVE = "PASS_LEAVE";
export const EMPTY_DATA = "EMPTY_DATA";

/**
 * 获取请假条。
 * @author Tinybo
 * @date 2019 04 15
 */
export function getAllLeave (data) {
    console.log('正在调用获取所有请假条接口。', data);

    return (dispatch, getState) => {
        // 调用后台获取请假条接口。
        $.post({
            url: host + '/getAllLeave',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('所有请假条获取接口调用成功：', res);
                if (res.code != '404') {
                    dispatch({
                        type: GET_ALL_LEAVE,
                        data: {
                            isFinish: true,
                            allLeave: res.data
                        }
                    });
                    return res;
                } else {
                    console.log('所有请假条信息获取失败！/ 无请假条。');
                    dispatch({
                        type: GET_ALL_LEAVE,
                        data: {
                            isFinish: false,
                            allLeave: []
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '所有请假条信息获取失败（服务器）！');
                dispatch({
                    type: GET_ALL_LEAVE,
                    data: {
                        isFinish: false
                    }
                });
            }
        });
        
    }
}

/**
 * 批假。
 * @author Tinybo
 * @date 2019 04 15
 */
export function passLeave (data) {
    console.log('正在调用获取所有请假条接口。', data);

    return (dispatch, getState) => {
        // 调用后台获取请假条接口。
        $.post({
            url: host + '/passLeave',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('批假接口调用成功：', res);
                if (res.code != '404') {
                    dispatch({
                        type: PASS_LEAVE,
                        data: {
                            isPass: true
                        }
                    });
                    toast('success', '批假成功！');
                    return res;
                } else {
                    toast('error', '批假失败！');
                    dispatch({
                        type: PASS_LEAVE,
                        data: {
                            isPass: false
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '批假失败（服务器）！');
                dispatch({
                    type: PASS_LEAVE,
                    data: {
                        isPass: false
                    }
                });
            }
        });
        
    }
}


/**
 * 获取请假条。
 * @author Tinybo
 * @date 2019 04 15
 */
export function emptyData () {
    console.log('正在清空数据。');

    return (dispatch, getState) => {
        // 调用后台获取请假条接口。
        dispatch({
            type: EMPTY_DATA,
            data: {
                isFinish: false,
                allLeave: []
            }
        });
        
    }
}
