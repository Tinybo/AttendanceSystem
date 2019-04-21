import $ from 'jquery';
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { toast } from '../../../common/utils/toast'; // 全局提示
import { dialog } from '../../../common/utils/dialog';
import { host } from '../../../common/hosts';

export const SEARCH_COURSE = "SEARCH_COURSE";
export const SIGN_IN  = "SIGN_IN";

/**
 * 完成课堂搜索操作。
 * @author Tinybo
 * @date 2019 04 20
 * @param {*} data 需要保存的数据。
 */
export function searchCourse (data) {
    return (dispatch, getState) => {
        // 调用后台搜索课堂接口。
        console.log('这就是课堂的数据:', data);
        $.post({
            url: host + '/searchCourse',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('课堂搜索接口调用成功：', res)
                if (res.code != '404') {
                    dispatch({
                        type: SEARCH_COURSE,
                        data: {
                            isFinish: true,
                            courseData: res.data
                        }
                    });
                } else {
                    toast('error', res.msg);
                    dispatch({
                        type: SEARCH_COURSE,
                        data: {
                            isFinish: true
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '搜索课堂失败！');
                console.log('搜索课堂接口调用失败：', err);
                dispatch({
                    type: SEARCH_COURSE,
                    data: {
                        isFinish: true
                    }
                });
            }
        });
    }
}

/**
 * 完成签到操作。
 * @author Tinybo
 * @date 2019 04 20
 * @param {*} data 需要保存的数据。
 */
export function signIn (data) {
    return (dispatch, getState) => {
        // 调用后台签到接口。
        console.log('这就是签到的数据:', data);
        $.post({
            url: host + '/signIn',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('签到接口调用成功：', res)
                if (res.code != '404') {
                    dispatch({
                        type: SIGN_IN,
                        data: {
                            isSign: true,
                            courseData: res.data
                        }
                    });
                } else {
                    toast('error', res.msg);
                    dispatch({
                        type: SIGN_IN,
                        data: {
                            isSign: true
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '签到失败！');
                console.log('签到接口调用失败：', err);
                dispatch({
                    type: SIGN_IN,
                    data: {
                        isSign: true
                    }
                });
            }
        });
    }
}