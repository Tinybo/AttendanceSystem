import * as actions from './action';     // 导入leaveDetail页面的所有方法。
import { Object } from 'core-js';

// 请假条详情页的初始化数据
const initData = {
    isFinish: false
}

export default function cancelLeave (state = initData, action) {
    switch (action.type) {
        case actions.CANCEL_LEAVE:
            return Object.assign({}, state, action.data);
        case actions.REJECT_LEAVE:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}