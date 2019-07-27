import $ from 'jquery';
import { host } from '../../../common/hosts';
import { toast } from '../../../common/utils/toast';

export const GET_LEAVE_INFO = "GET_LEAVE_INFO";
export const GET_ATTENDANCE_INFO = "GET_ATTENDANCE_INFO";
export const GET_COURSE_INFO = "GET_COURSE_INFO";

/**
 * 获取所有课堂信息。
 * @author Tinybo
 * @date 2019 05 13
 * @param {*} data 需要保存的数据。
 */
export function getAllAttendance (data) {
    return (dispatch, getState) => {
        // 调用后台请假接口。
        $.post({
            url: host + '/getAllCourse',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('所有课堂信息获取成功：', res);
                if (res.code != '404') {
                    dispatch({
                        type: GET_ATTENDANCE_INFO,
                        data: {
                            isFinish: true,
                            dataSource: res.data
                        }
                    });
                } else {
                    toast('error', '所有课堂信息获取失败！');
                    dispatch({
                        type: GET_ATTENDANCE_INFO,
                        data: {
                            isFinish: false
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '所有课堂信息获取失败（服务器）！');
                dispatch({
                    type: GET_ATTENDANCE_INFO,
                    data: {
                        isFinish: false
                    }
                });
            }
        });
        
    }
}

/**
 * 获取教师和学生的所有请假条。
 * @author Tinybo
 * @date 2019 05 12
 * @param {*} data 需要保存的数据。
 */
export function getAllLeave (data) {
    return (dispatch, getState) => {
        // 调用后台请假接口。
        $.post({
            url: host + '/getAllLeave',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('获取所有请假信息调用成功：', res);
                if (res.code != '404') {
                    dispatch({
                        type: GET_LEAVE_INFO,
                        data: {
                            isFinish: true,
                            dataSource: res.data
                        }
                    });
                } else {
                    toast('error', '请假信息提交失败！');
                    dispatch({
                        type: GET_LEAVE_INFO,
                        data: {
                            isFinish: false
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '请假信息提交失败（服务器）！');
                dispatch({
                    type: GET_LEAVE_INFO,
                    data: {
                        isFinish: false
                    }
                });
            }
        });
        
    }
}

/**
 * 获取某堂课程的所有信息。
 * @author Tinybo
 * @date 2019 05 14
 * @param {*} data 需要保存的数据。
 */
export function getCourseInfo (data) {
    return (dispatch, getState) => {
        // 调用后台请假接口。
        $.post({
            url: host + '/getCourseInfo',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('获取所有请假信息调用成功：', res);
                if (res.code != '404') {
                    dispatch({
                        type: GET_COURSE_INFO,
                        data: {
                            isFinish: true,
                            courseInfo: res.data
                        }
                    });
                } else {
                    toast('error', '请假信息提交失败！');
                    dispatch({
                        type: GET_COURSE_INFO,
                        data: {
                            isFinish: false
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '请假信息提交失败（服务器）！');
                dispatch({
                    type: GET_COURSE_INFO,
                    data: {
                        isFinish: false
                    }
                });
            }
        });
        
    }
}