import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPages/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
    <div>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/" component={LandingPage} />

        <Route path="/RegisterPage" component={RegisterPage}/>
    
        <Route path="/LoginPage" component = {LoginPage} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
