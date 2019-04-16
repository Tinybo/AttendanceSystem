import $ from 'jquery';
import { host } from '../../common/hosts';
import { toast } from '../../common/utils/toast';
import { hashHistory } from 'react-router';

export const CANCEL_LEAVE = "CANCEL_LEAVE";

/**
 * 完成销假操作。
 * @author Tinybo
 * @date 2019 04 16
 * @param {*} data 需要保存的数据。
 */
export function cancelLeave (data) {
    console.log('销假数据：', data);
    return (dispatch, getState) => {
        // 调用后台销假接口。
        $.post({
            url: host + '/cancelLeave',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('销假接口调用成功：', res);
                if (res.code != '404') {
                    toast('success', '销假成功！');
                    hashHistory.push('/home');   // 回到主页
                    dispatch({
                        type: CANCEL_LEAVE,
                        data: {
                            isFinish: true
                        }
                    });
                    hashHistory.push('/home');
                } else {
                    toast('error', '销假失败！');
                    dispatch({
                        type: CANCEL_LEAVE,
                        data: {
                            isFinish: false
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '销假失败（服务器）！');
                dispatch({
                    type: CANCEL_LEAVE,
                    data: {
                        isFinish: false
                    }
                });
            }
        });
        
    }
}