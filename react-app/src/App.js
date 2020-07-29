import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import GetStartedPage from './components/Auth/GetStartedPage';
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
          <Route exact path="/get-started/:form?" component={GetStartedPage} />
          <Route exact path="/dashboard/:clinkId" component={Dashboard} />
          <Route exact path="/" component={Home} />
          <Route exact path="/users/:userId" component={Users} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
