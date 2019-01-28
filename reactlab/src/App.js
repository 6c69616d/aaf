import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Animals from './Animals';
import AnimalsClass from './AnimalsClass.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Animals />
        <AnimalsClass />
      </div>
    );
  }
}

export default App;
