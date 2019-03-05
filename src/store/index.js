import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

/**
 * 二次封装createStore，是其可以将所有中间件变成数组元素，然后依次执行。
 * @author：Tinybo
 * @date：2018 10 19
 */
const createStoreFun = applyMiddleware(
    thunkMiddleware
)(createStore);

export default createStoreFun;