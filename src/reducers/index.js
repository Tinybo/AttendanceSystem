import { combineReducers } from 'redux';            // 用于合并所有的reducer
import { routerReducer } from 'react-router-redux';

import home from './home'                           // 导入子reducer
import login from '../page/auth/login/reducer'      // 导入Login

// 合并所有的reducer
const rootReducer = combineReducers({
    home,
    login,
    routing: routerReducer
});

export default rootReducer;