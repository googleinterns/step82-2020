import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginPage from './components/Auth/LoginPage';
import SignUpPage from './components/Auth/SignUpPage';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Users from './components/Users';
import './App.css';

function App() {
  
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/sign-up" component={SignUpPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
