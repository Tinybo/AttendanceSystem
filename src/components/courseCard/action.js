import $ from 'jquery';
import React, { Component } from 'react';
import { toast } from '../../common/utils/toast'; // 全局提示
import { host } from '../../common/hosts';

export const GET_STU_INFO = "GET_STU_INFO";
export const EMPTY_DATA = "EMPTY_DATA";

/**
 * 获取学生的到课信息。
 * @author Tinybo
 * @date 2019 04 24
 * @param {*} data 需要保存的数据。
 */
export function getCourseInfo (data) {
    return (dispatch, getState) => {
        // 调用后台学生到课信息接口。
        $.post({
            url: host + '/getCourseInfo',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('返回结果了res', res);
                if (res.code != '404') {
                    dispatch({
                        type: GET_STU_INFO,
                        data: {
                            courseData: res.data[0],
                            isFinish: true,
                        }
                    });
                } else {
                    toast('error', '学生到课信息失败！');
                    dispatch({
                        type: GET_STU_INFO,
                        data: {
                            isFinish: true
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '学生到课信息失败！');
                console.log('学生到课信息接口调用失败：', err);
                dispatch({
                    type: GET_STU_INFO,
                    data: {
                        isFinish: true
                    }
                });
            }
        });
        
    }
}

/**
 * 清空历史数据。
 * @author Tinybo
 * @date 2019 04 27
 * @param {*} data 需要保存的数据。
 */
export function emptyData (data) {
    return (dispatch, getState) => {
        dispatch({
            type: EMPTY_DATA,
            data: {
                courseData: {}
            }
        });
    }
}