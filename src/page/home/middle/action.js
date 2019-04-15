import $ from 'jquery';
import { host } from '../../../common/hosts';
import { toast } from '../../../common/utils/toast';
import { hashHistory } from 'react-router';

export const GET_LEAVE_NOTE = "GET_LEAVE_NOTE";

/**
 * 获取请假条。
 * @author Tinybo
 * @date 2019 04 15
 */
export function getLeaveNote (data) {
    console.log('正在调用获取请假条接口。');
    return (dispatch, getState) => {
        // 调用后台获取请假条接口。
        $.get({
            url: host + '/getLeaveNote',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('请假条获取接口调用成功：', res);
                if (res.code != '404') {
                    toast('success', '请假条信息获取成功！');
                    dispatch({
                        type: GET_LEAVE_NOTE,
                        data: {
                            isFinish: true
                        }
                    });
                    return res;
                } else {
                    toast('error', '请假条信息获取失败！');
                    dispatch({
                        type: GET_LEAVE_NOTE,
                        data: {
                            isFinish: false
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '请假条信息获取失败（服务器）！');
                dispatch({
                    type: GET_LEAVE_NOTE,
                    data: {
                        isFinish: false
                    }
                });
            }
        });
        
    }
}