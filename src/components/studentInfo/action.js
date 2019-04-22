import $ from 'jquery';
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { toast } from '../../common/utils/toast'; // 全局提示
import { dialog } from '../../common/utils/dialog';
import { host } from '../../common/hosts';

export const GET_ALL_STUDENT = "GET_ALL_STUDENT";

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
                    dispatch({
                        type: GET_ALL_STUDENT,
                        data: {
                            allStudent: res.data,
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