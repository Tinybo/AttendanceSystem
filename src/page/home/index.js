import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from '../../actions/home';
import './home.scss';

/**
 * 主页。
 * @author Tinybo
 * @date 2018 11 27
 */
class Home extends Component {
    constructor () {
        super();
        
        this.add = this.add.bind(this);
        this.del = this.del.bind(this);
        this.friendsList = this.friendsList.bind(this);
    }

    /**
     * 用于添加一篇文章。
     * @author: Tinybo
     * @date: 2018 10 19
     */
    add () {
        const { actions } = this.props;
        actions.add(this.refs['friend'].value);
    }

    /**
     * 用于删除好友。
     * @author Tinybo
     * @date 2018 11 27
     * @param {*} index 好友的序号。
     */
    del (index) {
        const { actions } = this.props;
        actions.del(index);
    }

    /**
     * 用于生成好友列表。
     * @author Tinybo
     * @date 2018 11 27
     */
    friendsList () {
        const { friends } = this.props;
        return friends.map((item, index) => {
            return (<li key={ index } onClick={ () => { this.del(index) } }>{ item }</li>);
        });
    }

    render () {
        return (
            <div className="homeContainer">
                <header>
                    <h2>Home Page</h2>
                </header>

                <main>
                    <div className="addForm">
                        <input type="text" name="friend" id="" defaultValue="Lily" placeholder="输入好友名……" ref="friend"/>
                        <button onClick={ this.add }>添加</button>
                    </div>

                    <ul className="friendsList">
                        { this.friendsList() }
                    </ul>
                </main>
            </div>
        )
    }
}

/*
const mapStateToProps = (state) => {
    return {
        friends: state.home.friends,
        age: state.home.age
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(homeActions, dispatch)
    }
};*/

export default connect(
    (state) => state.home,
    (dispatch) => ({
        actions: bindActionCreators(homeActions, dispatch)
    })
)(Home);
