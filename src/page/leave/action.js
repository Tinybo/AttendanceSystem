import $ from 'jquery';
import { host } from '../../common/hosts';
import { toast } from '../../common/utils/toast';

export const LEAVE = "LEAVE";

/**
 * 完成登录操作。
 * @author Tinybo
 * @date 2019 04 10
 * @param {*} data 需要保存的数据。
 */
export function leave (data) {
    console.log('请假条数据：', data);
    return (dispatch, getState) => {
        // 调用后台请假接口。
        $.post({
            url: host + '/leave',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('请假接口调用成功：', res);
                if (res.code != '404') {
                    toast('success', '请假信息提交成功！');
                    dispatch({
                        type: LEAVE,
                        data: {
                            isFinish: true
                        }
                    });
                } else {
                    toast('error', '请假信息提交失败！');
                    dispatch({
                        type: LEAVE,
                        data: {
                            isFinish: false
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '请假信息提交失败（服务器）！');
                dispatch({
                    type: LEAVE,
                    data: {
                        isFinish: false
                    }
                });
            }
        });
        
    }
}