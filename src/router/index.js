import App from '../app';
import Auth from '../page/auth';                // 登录注册页面
import PerfectInfo from '../page/perfectInfo';  // 完善信息页面

export const routes = [
    {
        path: '/',
        component: App,
        indexRoute: { component: PerfectInfo },
        childRoutes: [
            { path: '', component: Auth },
            { path: '/auth', component: Auth },
            { path: '/perfectInfo', component: PerfectInfo },
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