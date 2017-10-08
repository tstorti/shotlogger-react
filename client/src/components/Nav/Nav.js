import React from "react";
import "./Nav.css";

export const Nav = props =>(
  <div>
    <div className="header-primary">StreeBallStats</div>
    <div className="nav-container">
      <button className="btn-nav" onClick={() => props.redirect("logout")}>Logout</button>
      <button className="btn-nav" onClick={() => props.redirect("league")}>League Home</button>
      <button className="btn-nav" onClick={() => props.redirect("shotlogger")}>Shotlogger</button>
      <button className="btn-nav" onClick={() => props.redirect("dashboard")}>Dashboard</button>
    </div>
  </div>
);
