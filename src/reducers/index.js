import { combineReducers } from 'redux';            // 用于合并所有的reducer
import { routerReducer } from 'react-router-redux';

import login from '../page/auth/login/reducer';         // 导入Login
import register from '../page/auth/register/reducer';   // 导入Register
import perfectInfo from '../page/perfectInfo/reducer';  // 导入完善信息

// 合并所有的reducer
const rootReducer = combineReducers({
    login,
    register,
    perfectInfo,
    routing: routerReducer
});

export default rootReducer;