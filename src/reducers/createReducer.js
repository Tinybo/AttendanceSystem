import { Object } from "core-js";

/**
 * 用于快速生成reducer纯函数。
 * @author ： Tinybo
 * @date ：2018 10 19
 * @param {*} initData ：初始化数据。
 * @param {*} json ：Action组成的JSON对象。
 */
export default function (initData, json) {
    return function (state = initData || {}, action) {
        if (json[action.type]) return Object.assign({}, state, action.data);
        return state;
    }
}