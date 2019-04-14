import * as actions from './action';     // 导入leave页面的所有方法。
import { Object } from 'core-js';

// home页的初始化数据
const initData = {
    isFinish: false
}

export default function leave (state = initData, action) {
    switch (action.type) {
        case actions.LEAVE:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}