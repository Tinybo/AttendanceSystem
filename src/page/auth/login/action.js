export const LOGIN = "LOGIN";

/**
 * 完成登录操作。
 * @author Tinybo
 * @date 2019 04 10
 * @param {*} data 需要保存的数据。
 */
export function login (data) {
    return (dispatch, getState) => {
        console.log('您现在已经真正进入登录操作了:', data);
        dispatch({
            type: LOGIN,
            data: {...data}
        });
    }
}