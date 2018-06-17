import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Letter extends Component {
  render() {
    return (
      <div className="Letter">
      <p>A</p>
      <p>S</p>
      <p>D</p>
      <p>F</p>
      <p>G</p>
      <p>H</p>
      <p>J</p>
      <p>K</p>
      <p>L</p>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>React Drumkit</h1>
      <Letter />
      </div>
    );
  }
}

export default App;
