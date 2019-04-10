import React, { Component } from 'react';
import './app.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="mainContainer">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default App;
