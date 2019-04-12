import React, { Component } from 'react';
import './home.scss';


/**
 * 模版组件。
 * @author Tinybo
 * @date 2018 12 11
 */
class Home extends Component {
    constructor () {
        super();

        this.state = {

        };
    }

    render () {
        return (
            <div className="container">
                终于来到主页了。
            </div>
        )
    }
}

export default Home;