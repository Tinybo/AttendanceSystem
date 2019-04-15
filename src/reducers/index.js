import { combineReducers } from 'redux';            // 用于合并所有的reducer
import { routerReducer } from 'react-router-redux';

import login from '../page/auth/login/reducer';         // 导入Login
import register from '../page/auth/register/reducer';   // 导入Register
import perfectInfo from '../page/perfectInfo/reducer';  // 导入完善信息
import leave from '../page/leave/reducer';              // 导入请假条
import middle from '../page/home/middle/reducer';               // 主页主体内容

// 合并所有的reducer
const rootReducer = combineReducers({
    login,
    register,
    perfectInfo,
    leave,
    middle,
    routing: routerReducer
});

export default rootReducer;