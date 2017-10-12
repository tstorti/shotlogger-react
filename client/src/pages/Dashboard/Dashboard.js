import React, { Component } from "react";
import { Redirect } from 'react-router';
import API from "../../utils/API";
import data from "./data.js";
import * as d3 from "d3";
import "d3-hexbin";
import "d3.chart";
import BasketballShotChart from "../../chart/d3.basketball-shot-chart";
import "./dashboard.css";

var sample = require("./data.js");

 
class Dashboard extends Component {
  
  state = {
    allPlayers:[],
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

    selectedPlayer:"",

    redirectHome: false,
    redirectLeague:false,
    redirectShotlogger:false,
  };

  componentDidMount() {
    console.log(this.props.location.state);
    BasketballShotChart();
    //this.translateData();
    
    console.log(this.props.location.state.allPlayers[0]._id);
    this.getShots(this.props.location.state.allPlayers[0]._id);
    
    this.setState({
      allPlayers: this.props.location.state.allPlayers,
      selectedPlayer: this.props.location.state.allPlayers[0].name
    });
  };

  handleInputChange = event =>{
    this.setState({selectedPlayer: event.target.value}, () =>{
      this.getShots(this.state.selectedPlayer);
    });
  };

  getShots(id){
    API.getShots(id)
    .then(res => {
        console.log(res);
        this.translateData(res.data);
    })
    .catch(err => console.log(err));
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
  translateData = (data) => {
    //convert input data from canvas into readable scale and x,y layout for d3
    let array = [];
    for(var i=0; i<data.length;i++){
      let newShot={};
      newShot.x = data[i].x * (50/600); 
      newShot.y = (400 - data[i].y) * (35/400); 
      newShot.z = data[i].z;
      newShot.shooter = data[i].shooter;
      newShot.made = data[i].made;
      newShot.attempts = data[i].attempts;
      array.push(newShot);
    }
  
    this.playerShotDistr(array);
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
    if (this.state.redirectShotlogger) {
      return <Redirect to={{pathname:"/shotlogger/" + this.props.match.params.id, state:{ allPlayers:this.state.allPlayers }}}/>;
    }
    if (this.state.redirectLeague) {
      return <Redirect to={{pathname:"/league/" + this.props.match.params.id, state:{ allPlayers:this.state.allPlayers }}}/>;
    }
    if (this.state.redirectHome) {
      return <Redirect to={"/"}/>;
    }
    

    return (
      <div>
        <div>
          <button className="btn-nav" onClick={() => this.redirect("logout")}>Logout</button>
          <button className="btn-nav" onClick={() => this.redirect("league")}>League Home</button>
        </div>
        <h2 className="test">Dashboard</h2>
        <div>
            <div>Select a Player</div>
            <div>
              <select onChange={this.handleInputChange} value={this.state.selectedPlayer}>
                {this.state.allPlayers.map(player => (
                  <option key={player._id} value={player._id}>{player.name}</option>
                ))}
              </select>
            </div>
          </div>
        <div id="chart1"></div>
      </div>
    );
  }
}

export default Dashboard;
