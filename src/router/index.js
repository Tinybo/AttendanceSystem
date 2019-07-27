import App from '../app';
import Auth from '../page/auth';                // 登录注册页面
import PerfectInfo from '../page/perfectInfo';  // 完善信息页面
import Home from '../page/home';                // 主页
import Web from '../page/web';                  // Web端主页
import Leave from '../page/leave';              // 请假页面
import LeaveDetail from '../page/leaveDetail';  // 请假条详情页
import Attendance from '../page/attendance';
import StudentAttendance from '../page/attendance/studentAttend';
import TeacherAttendance from '../page/attendance/teacherAttend';
import TeacherCourse from '../page/attendance/teacherCourse';
import CourseDetail from '../page/attendance/courseDetail';

export const routes = [
    {
        path: '/',
        component: App,
        indexRoute: { component: Auth },
        childRoutes: [
            { path: '', component: Auth },
            { path: '/auth', component: Auth },
            { path: '/perfectInfo', component: PerfectInfo },
            { path: '/home', component: Home },
            { path: '/leave', component: Leave },
            { path: '/web', components: Web },
            { path: '/leaveDetail', component: LeaveDetail },
            { 
                path: '/attendance',
                component: Attendance,
                childRoutes: [
                    { path: 'student', component: StudentAttendance },
                    { path: 'teacherCourse', component: TeacherCourse },
                    { path: 'teacherAttend', component: TeacherAttendance },
                    { path: 'courseDetail', component: CourseDetail }
                ]
            },
            {
                path: '/about',
                component: Auth,
                onEnter: () => {
                    console.log('我进入About页面了。');
                },
                onLeave: () => {
                    console.log('我离开About页面了。');
                }
            }
        ]
    }
];