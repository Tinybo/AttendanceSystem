import React, { Component } from 'react';
import './music.scss';

class Music extends Component {
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
                <span>music</span>
            </div>
        )
    }
}

export default Music;