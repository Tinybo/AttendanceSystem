import * as actions from './action';     // 导入home页面的所有方法。
import { Object } from '_core-js@3.0.1@core-js';

// home页的初始化数据
const initData = {
    isFinish: false
}

export default function courseParent (state = initData, action) {
    switch (action.type) {
        case actions.CREATE_COURSE:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}