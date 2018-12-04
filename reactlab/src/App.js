import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Animals from './Animals';
import AnimalsClass from './AnimalsClass.js';


class App extends Component {
  render() {
    let data = this.state.pets || {};
    return (
        <div>
            <p>Here are the pets</p>
            <ul>
                {data}
            </ul>
        </div>
    );
}

}

export default App;
