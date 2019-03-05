import * as actions from '../actions/home';     // 导入home页面的所有方法。
import { Object } from 'core-js';

// home页的初始化数据
const initData = {
    friends: ['Tinybo']
}

// export default createReducer(initData, { 'ADD': add })

export default function home (state = initData, action) {
    switch (action.type) {
        case actions.ADD:
            return Object.assign({}, state, action.data);
        case actions.DEL:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}