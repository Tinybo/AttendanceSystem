import $ from 'jquery';
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { toast } from '../../../common/utils/toast'; // 全局提示
import { dialog } from '../../../common/utils/dialog';
import { host } from '../../../common/hosts';

export const GET_ALL_COURSE = "GET_ALL_COURSE";

/**
 * 完成获取所有课堂操作。
 * @author Tinybo
 * @date 2019 04 21
 * @param {*} data 需要保存的数据。
 */
export function getAllCourse (data) {
    return (dispatch, getState) => {
        // 调用后台登录接口。
        console.log('这就是所有课堂的数据:', data);
        $.post({
            url: host + '/getAllCourse',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('所有课堂接口调用成功：', res)
                if (res.code != '404') {
                    dispatch({
                        type: GET_ALL_COURSE,
                        data: {
                            allCourse: res.data,
                            isFinish: true,
                        }
                    });

                    console.log('所有课堂:', res);
                } else {
                    toast('error', '所有课堂获取失败！');
                    dispatch({
                        type: GET_ALL_COURSE,
                        data: {
                            isFinish: true
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '所有课堂失败！');
                console.log('所有课堂接口调用失败：', err);
                dispatch({
                    type: GET_ALL_COURSE,
                    data: {
                        isFinish: true
                    }
                });
            }
        });
        
    }
}