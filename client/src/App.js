import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./pages/Home";
import League from "./pages/League";
import Shotlogger from "./pages/Shotlogger";
import Dashboard from "./pages/Dashboard";

const App = () =>
  <Router>
    <div>
      <Switch>
        <Home exact path="/" component = {Home}></Home>
        <League exact path="/league" component = {League}></League>
        <Shotlogger exact path="/shotlogger" component = {Shotlogger}></Shotlogger>
        <Dashboard exact path="/dashboard" component = {Dashboard}></Dashboard>
      </Switch>
    </div>
  </Router>;

export default App;
