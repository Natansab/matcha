import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import ShowAll from './ShowAll';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p>
          <button>REFRESH SCORES</button>
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        Tous les users:
        {/* <ShowAll /> */}
        <Search />
      </div>
    );
  }
}

export default App;
