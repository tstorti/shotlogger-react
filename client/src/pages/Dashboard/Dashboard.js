import React, { Component } from "react";
import { Redirect } from 'react-router';
import API from "../../utils/API";
import { Nav } from "../../components/Nav";
import data from "./data.js";
import * as d3 from "d3";
import "d3-hexbin";
import "d3.chart";
import BasketballShotChart from "../../chart/d3.basketball-shot-chart";
import "./dashboard.css";

var sample = require("./data.js");

 
class Dashboard extends Component {
  
  state = {
    data:sample,
    loggerData: [
      {
        "x":111,
        "y":222,
        "made":1,
      },
      {
        "x":460,
        "y":140,
        "made":1,
      },
    ],
    gameData:[],

    redirectHome: false,
    redirectLeague:false,
    redirectShotlogger:false,
  };

  componentDidMount() {
    BasketballShotChart();
    this.translateData();
  };

  playerShotDistr = (data) => {
    //clear previous heat chart
    d3.select("svg").remove();
    //draw new heatmap
    var heatRange = ['#5458A2', '#6689BB', '#FADC97', '#F08460', '#B02B48'];	
    d3.select(document.getElementById('chart1'))
    .append("svg")
      .chart("BasketballShotChart", {
      width: 600, 
      title: 'Sample Data',
      })
    .draw(data); 
  };
  
  calcDistance = () => {
    //court length (y coord) goes from 0 to 35
    //court width (x coord) goes from 0 to 50
  };
  translateData = () => {
    //convert input data from canvas into readable scale and x,y layout for d3
    let array = this.state.gameData;
    for(var i=0; i<this.state.loggerData.length;i++){
      let newShot={};
      newShot.x = this.state.loggerData[i].x * (50/600); 
      newShot.y = (400 - this.state.loggerData[i].y) * (35/400); 
      newShot.z = this.state.loggerData[i].z;
      newShot.shooter = this.state.loggerData[i].shooter;
      newShot.made = this.state.loggerData[i].made;
      newShot.attempts = this.state.loggerData[i].attempts;
      array.push(newShot);
    }
    this.setState({
      gameData: array
    });
    this.playerShotDistr(this.state.gameData);
  };
  
  redirect = target =>{
    if(target === "league"){
      this.setState({
        redirectLeague:true,
      });
    }
    if(target === "logout"){
      this.setState({
        redirectHome:true,
      });
    }
    if(target === "shotlogger"){
      this.setState({
        redirectShotlogger:true,
      });
    }
  };

  render() {
    if (this.state.redirectLeague) {
      return <Redirect to={"/league/" + this.props.match.params.id}/>;
    }
    if (this.state.redirectHome) {
      return <Redirect to={"/"}/>;
    }
    if (this.state.redirectShotlogger) {
      return <Redirect to={"/shotlogger/" + this.props.match.params.id}/>;
    }

    return (
      <div>
        <Nav 
          redirect={this.redirect}
        />
        <h2 className="test">Dashboard</h2>
        <div id="chart1"></div>
      </div>
    );
  }
}

export default Dashboard;
