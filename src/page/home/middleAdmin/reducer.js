import * as actions from './action';     // 导入middle页面的所有方法。
import { Object } from 'core-js';

// middle页的初始化数据
const initData = {
    isFinish: false,
    isPass: false,
    allLeave: []
}

export default function getAllLeave (state = initData, action) {
    switch (action.type) {
        case actions.GET_ALL_LEAVE:
            return Object.assign({}, state, action.data);
        case actions.PASS_LEAVE:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}