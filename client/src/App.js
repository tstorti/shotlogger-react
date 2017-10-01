import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Shotlogger from "./pages/Shotlogger";
import Dashboard from "./pages/Dashboard";

const App = () =>
  <Router>
    <div>
      <Main exact path="/" component = {Main}></Main>
      <Switch>
        <Shotlogger exact path="/shotlogger" component = {Shotlogger}></Shotlogger>
        <Dashboard exact path="/dashboard" component = {Dashboard}></Dashboard>
      </Switch>
    </div>
  </Router>;

export default App;
