import { combineReducers } from 'redux';                // 用于合并所有的reducer
import { routerReducer } from 'react-router-redux';

import home from '../page/home/reducer';                // 导入Home
import login from '../page/auth/login/reducer';         // 导入Login
import register from '../page/auth/register/reducer';   // 导入Register
import perfectInfo from '../page/perfectInfo/reducer';  // 导入完善信息
import leave from '../page/leave/reducer';              // 导入请假条
import middle from '../page/home/middle/reducer';       // 主页主体内容
import middleAdmin from '../page/home/middleAdmin/reducer';  // 主页主体内容（学工办、学院领导）
import cancelLeave from '../page/leaveDetail/reducer';  // 请假条详情页
import studentAttend from '../page/attendance/studentAttend/reducer';
import teacherAttend from '../page/attendance/teacherAttend/reducer';
import teacherCourse from '../page/attendance/teacherCourse/reducer';
import courseDetail from '../page/attendance/courseDetail/reducer';
import studentInfo from '../components/studentInfo/reducer';

// 合并所有的reducer
const rootReducer = combineReducers({
    login,
    register,
    perfectInfo,
    leave,
    middle,
    middleAdmin,
    cancelLeave,
    home,
    studentAttend,
    teacherAttend,
    teacherCourse,
    courseDetail,
    studentInfo,
    routing: routerReducer
});

export default rootReducer;