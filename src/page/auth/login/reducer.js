import * as actions from './action';     // 导入home页面的所有方法。
import { Object } from 'core-js';

// home页的初始化数据
const initData = {
    isLoginFinish: false
}

// export default createReducer(initData, { 'ADD': add })

export default function home (state = initData, action) {
    switch (action.type) {
        case actions.LOGIN:
            return Object.assign({}, state, action.data);
        case actions.RESET_BTN:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}