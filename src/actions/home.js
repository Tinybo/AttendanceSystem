export const ADD = "ADD";
export const DEL = 'DEL';

/**
 * 往朋友列表里添加一个朋友。
 * @author Tinybo
 * @date 2018 11 27
 * @param {*} data 需要保存的数据。
 */
export function add (data) {
    return (dispatch, getState) => {
        let b = [].concat(getState().home.friends);
        b.unshift(data);
        dispatch({
            type: ADD,
            data: {
                friends: b
            }
        });
    }
}

/**
 * 删除指定好友。
 * @author Tinybo
 * @date 2018 11 27
 * @param {*} index 好友的序号。 
 */
export function del (index) {
    return (dispatch, getState) => {
        let temp = [].concat(getState().home.friends);
        temp.splice(index, 1);
        dispatch({
            type: DEL,
            data: {
                friends: temp
            }
        });
    }
}