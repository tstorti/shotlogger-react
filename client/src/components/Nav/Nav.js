import React from "react";
import "./Nav.css";

export const Nav = props =>(
  <div>
    <div className="header-primary">StreeBallStats</div>
    <div className="nav-container">
      <a className="nav-link" href="./">Logout</a>
      <a className="nav-link" href="/shotlogger">Shotlogger</a>
      <a className="nav-link" href="/dashboard">Dashboard</a>
    </div>
  </div>
);
