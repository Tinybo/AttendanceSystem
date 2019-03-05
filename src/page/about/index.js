import React, { Component } from 'react';
import './about.scss';

class About extends Component {
    constructor () {
        super();
        
        this.add = this.add.bind(this);
    }

    /**
     * 用于添加一篇文章。
     * @author: Tinybo
     * @date: 2018 10 19
     */
    add () {
        return 0;
    }

    render () {
        return (
            <div>
                About
            </div>
        )
    }
}

export default About;