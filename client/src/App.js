import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import League from "./pages/League";
import Shotlogger from "./pages/Shotlogger";
import Dashboard from "./pages/Dashboard";

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/league/:id" component={League} />
        <Route exact path="/shotlogger/:id" component={Shotlogger} />
        <Route exact path="/dashboard/:id" component={Dashboard} />
      </Switch>
    </div>
  </Router>;

export default App;
