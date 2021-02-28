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
import Auth from './hoc/auth';
function App() {
  return (
    <Router>
    <div>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
 
        <Route exact path="/" component={Auth(LandingPage, null)} />

        <Route path="/RegisterPage" component={Auth(RegisterPage, false)}/>
    
        <Route path="/Login" component = {Auth(LoginPage, false)} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
