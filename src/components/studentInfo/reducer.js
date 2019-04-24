import * as actions from './action';     // 导入home页面的所有方法。
import { Object } from '_core-js@3.0.1@core-js';

// home页的初始化数据
const initData = {
    allStudent: [],
    shouldNum: 0,
    realNum: 0,
    askLeaveNum: 0,
    lateNum: 0,
    leaveEarlyNum: 0,
    truancyNum: 0,
    unSignInNum: 0,
    isFinish: false
}

export default function studentInfo (state = initData, action) {
    switch (action.type) {
        case actions.GET_ALL_STUDENT:
            return Object.assign({}, state, action.data);
        case actions.SET_STUDENT_STATUS:
            return Object.assign({}, state, action.data);
        case actions.END_COURSE:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}