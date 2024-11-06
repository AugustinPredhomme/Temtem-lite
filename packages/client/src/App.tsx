import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="logo" alt="temtem-lite-logo" />
        <p>
          Home Page
        </p>
        <a className="tab-link" href="/login">
          Register
        </a>
        <a className="tab-link" href="/register">
          Login
        </a>
      </header>
    </div>
  );
}

export default App;
