import $ from 'jquery';
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { toast } from '../../../common/utils/toast'; // 全局提示
import { dialog } from '../../../common/utils/dialog';
import { host } from '../../../common/hosts';

export const CREATE_COURSE = "CREATE_COURSE";

/**
 * 完成创建课堂操作。
 * @author Tinybo
 * @date 2019 04 10
 * @param {*} data 需要保存的数据。
 */
export function createCourse (data) {
    return (dispatch, getState) => {
        // 调用后台登录接口。
        console.log('这就是创建课堂的数据:', data);
        $.post({
            url: host + '/createCourse',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('创建课堂接口调用成功：', res)
                if (res.code != '404') {
                    dispatch({
                        type: CREATE_COURSE,
                        data: {
                            isFinish: true,
                        }
                    });

                    console.log('创建课堂:', res);
                    dialog({
                        type: 'success',
                        title: '温馨提示',
                        content: (
                            <div style={{ marginTop: '15px' }}>
                                <p>您的 <b>{ res.data.name }</b> 课创建成功!</p>
                                <p>课堂ID号为：<b>{ res.data.id }</b></p>
                                <p>请将课堂ID号尽快告知同学们！</p>
                            </div>
                        ),
                        okText: '知道了',
                        callback: () => {
                            toast('success', '告知成功！');
                        }
                    });
                } else {
                    toast('error', '创建课堂失败！');
                    dispatch({
                        type: CREATE_COURSE,
                        data: {
                            isFinish: true
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '创建课堂失败！');
                console.log('创建课堂接口调用失败：', err);
                dispatch({
                    type: CREATE_COURSE,
                    data: {
                        isFinish: true
                    }
                });
            }
        });
        
    }
}