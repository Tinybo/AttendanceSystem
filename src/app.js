import React, { Component } from 'react';
import './app.scss';
import { Link } from 'react-router';

import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Icon type="loading" style={{ color: 'red'}} />
          
          <p>一个基于 React + Redux + React Router + AntDesign 的应用程序。</p>
        </header>
        <Button type="primary">Primary</Button>
        <main>
          <nav>
            <Link to="/home">Home</Link>
            <Link to="/music">Music</Link>
            <Link to="/about">About</Link>
          </nav>

          <div className="mainContainer">
            {
              this.props.children
            }
          </div>
        </main>
      </div>
    );
  }
}

export default App;
