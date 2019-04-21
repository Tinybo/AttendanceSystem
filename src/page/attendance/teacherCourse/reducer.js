import * as actions from './action';     // 导入home页面的所有方法。
import { Object } from '_core-js@3.0.1@core-js';

// home页的初始化数据
const initData = {
    allCourse: [],
    isFinish: false
}

export default function teacherCourse (state = initData, action) {
    switch (action.type) {
        case actions.GET_ALL_COURSE:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}