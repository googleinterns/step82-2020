import React from 'react';
import {Switch, Route} from 'react-router-dom';
import LoginPage from './components/Auth/LoginPage';
import SignUpPage from './components/Auth/SignUpPage';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>My Token = {window.token}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/sign-up">
          <SignUpPage />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
