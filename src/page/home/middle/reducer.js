import * as actions from './action';     // 导入middle页面的所有方法。
import { Object } from 'core-js';

// middle页的初始化数据
const initData = {
    isFinish: false
}

export default function leave (state = initData, action) {
    switch (action.type) {
        case actions.GET_LEAVE_NOTE:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}