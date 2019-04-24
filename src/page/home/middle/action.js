import $ from 'jquery';
import { host } from '../../../common/hosts';
import { toast } from '../../../common/utils/toast';
import { hashHistory } from 'react-router';

export const GET_LEAVE_NOTE = "GET_LEAVE_NOTE";
export const EMPTY_DATA = "EMPTY_DATA";
export const GET_STATISTIC = "GET_STATISTIC";

/**
 * 获取请假条。
 * @author Tinybo
 * @date 2019 04 15
 */
export function getLeaveNote (data) {
    console.log('正在调用获取请假条接口。', data);

    return (dispatch, getState) => {
        // 调用后台获取请假条接口。
        $.get({
            url: host + '/getLeaveNote',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('请假条获取接口调用成功：', res);
                if (res.code != '404') {
                    dispatch({
                        type: GET_LEAVE_NOTE,
                        data: {
                            isFinish: true,
                            leaveNoteData: res.data
                        }
                    });
                    return res;
                } else {
                    dispatch({
                        type: GET_LEAVE_NOTE,
                        data: {
                            isFinish: false,
                            leaveNoteData: []
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '请假条信息获取失败（服务器）！');
                dispatch({
                    type: GET_LEAVE_NOTE,
                    data: {
                        isFinish: false,
                        leaveNoteData: []
                    }
                });
            }
        });
        
    }
}

/**
 * 获取考勤的统计信息。
 * @author Tinybo
 * @date 2019 04 24
 */
export function getStatistic (data) {
    console.log('正在调用获取考勤统计信息接口。', data);

    return (dispatch, getState) => {
        // 调用后台获取请假条接口。
        $.post({
            url: host + '/getStatistic',
            dataType: 'json',
            data: data,
            success: (res) => {
                if (res.code != '404') {
                    dispatch({
                        type: GET_STATISTIC,
                        data: {
                            isFinish: true,
                            attendData: res.data
                        }
                    });
                    return res;
                } else {
                    dispatch({
                        type: GET_STATISTIC,
                        data: {
                            isFinish: false,
                            leaveNoteData: []
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '获取考勤统计信息失败（服务器）！');
                dispatch({
                    type: GET_STATISTIC,
                    data: {
                        isFinish: false,
                        leaveNoteData: []
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
                leaveNoteData: []
            }
        });
        
    }
}