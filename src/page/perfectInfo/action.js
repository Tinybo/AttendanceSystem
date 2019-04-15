import $ from 'jquery';
import { hashHistory } from 'react-router';
import { toast } from '../../common/utils/toast'; // 全局提示
import { host } from '../../common/hosts';

export const PERFECT_INFO = "PERFECT_INFO";

/**
 * 完成完善信息操作。
 * @author Tinybo
 * @date 2019 04 10
 * @param {*} data 需要保存的数据。
 */
export function perfectInfo (data) {
    return (dispatch, getState) => {
        // 调用后台登录接口。
        console.log('这就是完善信息的数据:', data);
        $.post({
            url: host + '/perfectInfo',
            dataType: 'json',
            data: data,
            success: (res) => {
                console.log('完善信息接口调用成功：', res)
                if (res.code != '404') {
                    let result = res.data;
                    dispatch({
                        type: PERFECT_INFO,
                        data: {
                            ...result,
                        }
                    });

                    console.log('完善信息:', result);
                    toast('success', '完善信息成功！');
                    hashHistory.push('/home');
                } else {
                    toast('error', '完善信息失败！');
                    dispatch({
                        type: PERFECT_INFO,
                        data: {
                            isFinish: true
                        }
                    });
                }
            },
            error: (err) => {
                toast('error', '完善信息失败！');
                console.log('完善信息接口调用失败：', err);
                dispatch({
                    type: PERFECT_INFO,
                    data: {
                        isFinish: true
                    }
                });
            }
        });
        
    }
}