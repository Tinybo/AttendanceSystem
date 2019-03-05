import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { routes } from './router/index.js';                     // 路由
import { Provider } from 'react-redux';                         // 同步store，放在该标签内的组件都可访问store
import { Router, hashHistory } from 'react-router';             // 第二个变量为路由的模式
import { syncHistoryWithStore }  from 'react-router-redux';     // 可以同步store的history
import createStore from './store';                              // 封装后的createStore函数
import reducers from './reducers';                              // 所有的reducer

const store = createStore(reducers);
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(<Provider store={ store }>
    <Router history={ history }>
        { routes }
    </Router>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
