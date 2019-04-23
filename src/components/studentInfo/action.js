import $ from 'jquery';
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { toast } from '../../common/utils/toast'; // 全局提示
import { dialog } from '../../common/utils/dialog';
import { host } from '../../common/hosts';

export const GET_ALL_STUDENT = "GET_ALL_STUDENT";
export const SET_STUDENT_STATUS = "SET_STUDENT_STATUS";

/**
 * 完成获取某堂课的所有学生信息操作。
 * @author Tinybo
 * @date 2019 04 22
 * @param {*} data 需要保存的数据。
 */
export function getAllStudent (data) {
    return (dispatch, getState) => {
        // 调用后台登录接口。
        console.log('这就是某堂课学生信息的数据:', data);
        $.post({
            url: host + '/getAllStudent',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('某堂课学生信息接口调用成功：', res)
                if (res.code != '404') {
                    // 统计各状态数量
                    let shouldNum = 0;
                    let realNum = 0;
                    let lateNum = 0;
                    let leaveEarlyNum = 0;
                    let truancyNum = 0;
                    let askLeaveNum = 0;

                    if (res.data[0]) {
                        res.data.forEach(x => {
                            switch (x.status) {
                                case 1: realNum++; break;
                                case 2: askLeaveNum++; break;
                                case 3: lateNum++; break;
                                case 4: leaveEarlyNum++; break;
                                case 5: truancyNum++; break;
                                default: break;
                            }
                            shouldNum++;
                        });
                    }
                    dispatch({
                        type: GET_ALL_STUDENT,
                        data: {
                            allStudent: res.data,
                            shouldNum: shouldNum,
                            realNum: realNum,
                            lateNum: lateNum,
                            leaveEarlyNum: leaveEarlyNum,
                            truancyNum: truancyNum,
                            askLeaveNum: askLeaveNum,
                            unSignInNum: shouldNum - realNum - lateNum - leaveEarlyNum - truancyNum - askLeaveNum, 
                            isFinish: true,
                        }
                    });

                    console.log('某堂课学生信息:', res);
                } else {
                    toast('error', '某堂课学生信息获取失败！');
                    dispatch({
                        type: GET_ALL_STUDENT,
                        data: {
                            isFinish: true
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '某堂课学生信息失败！');
                console.log('某堂课学生信息接口调用失败：', err);
                dispatch({
                    type: GET_ALL_STUDENT,
                    data: {
                        isFinish: true
                    }
                });
            }
        });
        
    }
}

/**
 * 设置学生的到课状态。
 * @author Tinybo
 * @date 2019 04 23
 * @param {*} data 需要保存的数据。
 */
export function setStudentStatus (data) {
    return (dispatch, getState) => {
        // 调用后台登录接口。
        console.log('这就是设置学生到课的数据:', data);
        $.post({
            url: host + '/setStudentStatus',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('设置学生到课接口调用成功：', res)
                if (res.code != '404') {
                    toast('success', '学生状态设置成功');
                    dispatch({
                        type: SET_STUDENT_STATUS,
                        data: {
                            isFinish: true,
                        }
                    });

                    console.log('设置学生到课返回:', res);
                } else {
                    toast('error', '设置学生到课失败！');
                    dispatch({
                        type: SET_STUDENT_STATUS,
                        data: {
                            isFinish: true
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '设置学生到课失败！');
                console.log('设置学生到课接口调用失败：', err);
                dispatch({
                    type: SET_STUDENT_STATUS,
                    data: {
                        isFinish: true
                    }
                });
            }
        });
        
    }
}