import { combineReducers } from 'redux';            // 用于合并所有的reducer
import { routerReducer } from 'react-router-redux';

import home from './home'                           // 导入子reducer

// 合并所有的reducer
const rootReducer = combineReducers({
    home,
    routing: routerReducer
});

export default rootReducer;