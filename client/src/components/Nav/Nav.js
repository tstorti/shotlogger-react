import React from "react";
import "./nav.css";

export const Nav = props =>(
  <div>
    <div className="header-primary">Welcome to StreetBallStats</div>
    <div className="nav-container">
      <a className="nav-link" href="./">Home</a>
      <a className="nav-link" href="/shotlogger">Shotlogger</a>
      <a className="nav-link" href="/dashboard">Dashboard</a>
    </div>
  </div>
);
