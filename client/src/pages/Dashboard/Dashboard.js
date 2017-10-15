import React, { Component } from "react";
import { Redirect } from 'react-router';
import API from "../../utils/API";
import * as d3 from "d3";
import "d3-hexbin";
import "d3.chart";
import BasketballShotChart from "../../chart/d3.basketball-shot-chart";
import logo from './logo.png';


class Dashboard extends Component {
  
  state = {
    allPlayers:[],
    leagueID:'',
    gameData:[],
    playerData:[],
    comparisonPlayerData:[],

    selectedPlayer:"",
    comparisonPlayer:"",
    
    shootingPercentage:"",
    totalShots:"",
    madeShots:"",

    leagueShootingPercentage:"",
    leagueAverageTotalShots:"",
    leagueAverageMadeShots:"",

    redirectHome: false,
    redirectLeague:false,
    redirectShotlogger:false,
  };

  componentDidMount() {
    console.log(this.props.location.state);
    BasketballShotChart();
    
    console.log(this.props.location.state.allPlayers[0]._id);
    this.getPlayerShots(this.props.location.state.allPlayers[0]._id);
    this.getAllShots(this.props.location.state.leagueID);
    
    this.setState({
      allPlayers: this.props.location.state.allPlayers,
      selectedPlayer: this.props.location.state.allPlayers[0].name,
      leagueID:this.props.location.state.leagueID,
    });
  };

  handleInputChange = event =>{
    this.setState({selectedPlayer: event.target.value}, () =>{
      this.getPlayerShots(this.state.selectedPlayer);
    });
  };
  handleInputChange2 = event =>{
    if(event.target.value ==="None"){
      this.setState({showComparison:false});
    }
    else{
      this.setState({comparisonPlayer: event.target.value}, () =>{
        this.getPlayerShots(this.state.comparisonPlayer, "comparison");
      });
    }
    
  };

  getAllShots(id){
    //should replace with leagueID
    API.getAllShots(id)
    .then(res => {
        console.log(res);
        //this.translateData(res.data);
        this.calcLeagueSummaryStats(res.data);
    })
    .catch(err => console.log(err));
  };

  getPlayerShots(id, target){
    API.getShots(id)
    .then(res => {
        console.log(res);
        this.translateData(res.data, target);
        this.calcSummaryStats(res.data, target);
    })
    .catch(err => console.log(err));
  };

  playerShotDistr = () => {
    //clear previous heat chart
    d3.selectAll("svg").remove();
    //draw new heatmap
    //var heatRange = ['#5458A2', '#6689BB', '#FADC97', '#F08460', '#B02B48'];	
    console.log(this.state.playerData);
    console.log(this.state.comparisonPlayerData);
    d3.select(document.getElementById("chart1"))
    .append("svg")
      .chart("BasketballShotChart", {
      width: 500, 
      title: "",
      })
    .draw(this.state.playerData); 

    d3.select(document.getElementById("chart2"))
    .append("svg")
      .chart("BasketballShotChart", {
      width: 500, 
      title: "",
      })
    .draw(this.state.comparisonPlayerData); 
  };

  calcDistance = () => {
    //court length (y coord) goes from 0 to 35
    //court width (x coord) goes from 0 to 50
  };

  calcSummaryStats = (data, target) => {
    if(target==="comparision"){

    }
    else{
      let totalShots = 0;
      let madeShots = 0;
      for(let i=0;i<data.length;i++){
        if(data[i].made===1){
          madeShots++;
        }
        totalShots++;
      }
      this.setState({
        shootingPercentage:100*(madeShots/totalShots),
        totalShots:totalShots,
        madeShots:madeShots,
      })
    }
    
  };

  calcLeagueSummaryStats = (data) => {
    let totalShots = 0;
    let madeShots = 0;
    for(let i=0;i<data.length;i++){
      if(data[i].made===1){
        madeShots++;
      }
      totalShots++;
    }
    let averageShots = totalShots/this.state.allPlayers.length;
    let averageMadeShots = madeShots/this.state.allPlayers.length
    this.setState({
      leagueShootingPercentage:100*(madeShots/totalShots),
      leagueAverageTotalShots:averageShots,
      leagueAverageMadeShots:averageMadeShots,
    })
  };

  translateData = (data, target) => {
    //convert input data from canvas into readable scale and x,y layout for d3
    let array = [];
    for(let i=0; i<data.length;i++){
      let newShot={};
      newShot.x = data[i].x * (50/600); 
      newShot.y = (400 - data[i].y) * (35/400); 
      newShot.z = data[i].z;
      newShot.shooter = data[i].shooter;
      newShot.made = data[i].made;
      newShot.attempts = data[i].attempts;
      array.push(newShot);
    }
    if(target ==="comparison"){
      this.setState({
        comparisonPlayerData:array,
        showComparison:true,
      });
    }
    else{
      this.setState({
        playerData:array,
      });
    }
  
    this.playerShotDistr();
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
      return <Redirect to={{pathname:"/shotlogger/" + this.props.match.params.id, state:{ allPlayers:this.state.allPlayers, leagueID: this.state.leagueID }}}/>;
    }
    if (this.state.redirectLeague) {
      return <Redirect to={{pathname:"/league/" + this.props.match.params.id, state:{ allPlayers:this.state.allPlayers, leagueID:this.state.leagueID }}}/>;
    }
    if (this.state.redirectHome) {
      return <Redirect to={"/"}/>;
    }
    

    return (
      <div>
        {/* Header */}
        <div className="header-main">
          <div className="d-f">
            <div className="ml-20 d-f">
              <div><img className="logo-header" src={logo} alt="logo"></img></div>
              <div className="ml-20">Shotlogger</div>
            </div>
            <div className="a-r">
              <button className="btn-nav" onClick={() => this.redirect("logout")}>Logout</button>
              <button className="btn-nav" onClick={() => this.redirect("league")}>League Home</button>
            </div>
          </div>  
        </div>

        {/* Page Content */}
        <div className="page-content">
          <div className="ml-20 d-ib">
            <div className="mb-10">Stats for Player: </div>
            <div>
              <select className="select-player" onChange={this.handleInputChange} value={this.state.selectedPlayer}>
                {this.state.allPlayers.map(player => (
                  <option key={player._id} value={player._id}>{player.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="ml-20 d-ib">
            <div className="mb-10">Compare with Player: </div>
            <div>
              <select className="select-player" onChange={this.handleInputChange2} value={this.state.comparisonPlayer}>
              <option  value="None">None</option>
                {this.state.allPlayers.map(player => (
                  <option key={player._id} value={player._id}>{player.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div >
            <div className="d-f">
              <div className="court-dashboard" id="chart1"></div>
              <div className="a-r mr-20">
                <table>
                  <tbody>
                    <tr>
                      <th></th>
                      <th>Player Stats</th>
                      <th>League Average</th>
                    </tr>
                    <tr>
                      <th>Made</th>
                      <td>{this.state.madeShots}</td>
                      <td>{Math.round(this.state.leagueAverageMadeShots)}</td>
                    </tr>
                    <tr>
                      <th>Attempted</th>
                      <td>{this.state.totalShots}</td>
                      <td>{Math.round(this.state.leagueAverageTotalShots)}</td>
                    </tr>
                    <tr>
                      <th>Shooting %</th>
                      <td>{Math.round(this.state.shootingPercentage)}%</td>
                      <td>{Math.round(this.state.leagueShootingPercentage)}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Show Comparison if one selected */}
            {this.state.showComparison &&  
            <div>
              <div className="mt-20 mb-20 section-break"></div>
              <div className="d-f">
                <div className="court-dashboard" id="chart2"></div>
                <div className="a-r mr-20">
                  <table>
                    <tbody>
                      <tr>
                        <th></th>
                        <th>Player Stats</th>
                        <th>League Average</th>
                      </tr>
                      <tr>
                        <th>Made</th>
                        <td>{this.state.madeShots}</td>
                        <td>{Math.round(this.state.leagueAverageMadeShots)}</td>
                      </tr>
                      <tr>
                        <th>Attempted</th>
                        <td>{this.state.totalShots}</td>
                        <td>{Math.round(this.state.leagueAverageTotalShots)}</td>
                      </tr>
                      <tr>
                        <th>Shooting %</th>
                        <td>{Math.round(this.state.shootingPercentage)}%</td>
                        <td>{Math.round(this.state.leagueShootingPercentage)}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
