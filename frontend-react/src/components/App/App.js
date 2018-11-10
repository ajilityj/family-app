import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './App.css';
import ConversationsList from '../ConversationsList/ConversationsList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App--header">
          <img
            src={logo}
            className="App--header-logo"
            alt="Finland coat of arms"
          />
          <h1 className="App--header-title">Perhe</h1>
        </header>
        <ConversationsList />
      </div>
    );
  }
}

export default App;
