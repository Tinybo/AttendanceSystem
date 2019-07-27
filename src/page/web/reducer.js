import * as actions from './action';     // 导入middle页面的所有方法。
import { Object } from 'core-js';

// middle页的初始化数据
const initData = {
    isFinish: false,
}

export default function web (state = initData, action) {
    switch (action.type) {
        default:
            return state;
    }
}