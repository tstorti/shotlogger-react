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
    selectedPlayerName:"",
    comparisonPlayer:"",
    comparisonPlayerName:"",
    
    shootingPercentage:"",
    totalShots:"",
    madeShots:"",
    totalThrees:"",
    madeThrees:"",
    shootingPercentageThrees:"",
    trueShootingPercentage:"",
    

    comparisonShootingPercentage:"",
    comparisonTotalShots:"",
    comparisonMadeShots:"",
    comparisonTotalThrees:"",
    comparisonMadeThrees:"",
    comparisonShootingPercentageThrees:"",
    comparisonTrueShootingPercentage:"",
    

    leagueShootingPercentage:"",
    leagueAverageTotalShots:"",
    leagueAverageMadeShots:"",
    leagueAverageTotalThrees:"",
    leagueAverageMadeThrees:"",
    leagueShootingPercentageThrees:"",
    leagueTrueShootingPercentage:"",


    redirectHome: false,
    redirectLeague:false,
    redirectShotlogger:false,
  };

  componentDidMount() {
    //console.log(this.props.location.state);
    BasketballShotChart();
    
    //console.log(this.props.location.state.allPlayers[0]._id);
    this.getPlayerShots(this.props.location.state.allPlayers[0]._id);
    this.getAllShots(this.props.location.state.leagueID);
    
    this.setState({
      allPlayers: this.props.location.state.allPlayers,
      selectedPlayer: this.props.location.state.allPlayers[0].name,
      selectedPlayerName: this.props.location.state.allPlayers[0].name,
      leagueID:this.props.location.state.leagueID,
    });
  };

  handleInputChange = event =>{
    //console.log(this.state.allPlayers);
    for(let i=0;i<this.state.allPlayers.length;i++){
      if(this.state.allPlayers[i]._id===event.target.value){
        this.setState({
          selectedPlayerName:this.state.allPlayers[i].name,
        });
      }
    }
    this.setState({selectedPlayer: event.target.value}, () =>{
      this.getPlayerShots(this.state.selectedPlayer);
    });
  };
  handleInputChange2 = event =>{
    if(event.target.value ==="None"){
      this.setState({showComparison:false});
    }
    else{
      for(let i=0;i<this.state.allPlayers.length;i++){
        if(this.state.allPlayers[i]._id===event.target.value){
          this.setState({
            comparisonPlayerName:this.state.allPlayers[i].name,
          });
        }
      }
      
      this.setState({comparisonPlayer: event.target.value}, () =>{
        this.getPlayerShots(this.state.comparisonPlayer, "comparison");
      });
    }
    
  };

  getAllShots(id){
    //should replace with leagueID
    API.getAllShots(id)
    .then(res => {
        //console.log(res);
        //this.translateData(res.data);
        this.calcLeagueSummaryStats(res.data);
    })
    .catch(err => console.log(err));
  };

  getPlayerShots(id, target){
    API.getShots(id)
    .then(res => {
        //console.log(res);
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
    //console.log(this.state.playerData);
    //console.log(this.state.comparisonPlayerData);
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
    if(target==="comparison"){
      let totalShots = 0;
      let madeShots = 0;
      let totalThrees = 0;
      let madeThrees = 0;
    

      
      for(let i=0;i<data.length;i++){
        
        //calculate if a three pointer
        let isThree = false;
        let x = data[i].x;
        let y = data[i].y;
    
        //corner threes
        if((x<5.4 && y<14) || (x>44.5 && y<14)){
          isThree = true;
        }
        //based on radius of court three pointer and center of court (formula for a circle solved & rounded)
        if((y*y +x*x -50*x +625) > 552.25){
          isThree = true;
        }
        
        if(data[i].made===1){
          madeShots++;
          if(isThree){
            madeThrees++
          }
        }
        //console.log(x +", "+y+ " is 3pt? "+ isThree);
        if(isThree){
          totalThrees++;
        }
        totalShots++;
      }
      this.setState({
        comparisonShootingPercentage:100*(madeShots/totalShots),
        comparisonTotalShots:totalShots,
        comparisonMadeShots:madeShots,
        comparisonTotalThrees:totalThrees,
        comparisonMadeThrees:madeThrees,
        comparisonShootingPercentageThrees:100*(madeThrees/totalThrees),
        //assume no free throws
        comparisonTrueShootingPercentage:100*((3*madeThrees)+2*(madeShots-madeThrees))/(2*totalShots),
      })
    }
    else{
      let totalShots = 0;
      let madeShots = 0;
      let totalThrees = 0;
      let madeThrees = 0;

      for(let i=0;i<data.length;i++){
        //calculate if a three pointer
        let isThree = false;
        let x = data[i].x;
        let y = data[i].y;
    
        //corner threes
        if((x<5.4 && y<14) || (x>44.5 && y<14)){
          isThree = true;
        }
        //based on radius of court three pointer and center of court (formula for a circle solved & rounded)
        if((y*y +x*x -50*x +625) > 552.25){
          isThree = true;
        }
        
        if(data[i].made===1){
          madeShots++;
          if(isThree){
            madeThrees++;
          }
        }
        if(isThree){
          totalThrees++;
        }
        totalShots++;
      }
      this.setState({
        shootingPercentage:100*(madeShots/totalShots),
        totalShots:totalShots,
        madeShots:madeShots,
        totalThrees:totalThrees,
        madeThrees:madeThrees,
        shootingPercentageThrees:100*(madeThrees/totalThrees),
        trueShootingPercentage:100*((3*madeThrees)+2*(madeShots-madeThrees))/(2*totalShots),
      })
    }
    
  };

  calcLeagueSummaryStats = (data) => {
    let totalShots = 0;
    let madeShots = 0;
    let totalThrees = 0;
    let madeThrees = 0;

    for(let i=0;i<data.length;i++){
      //calculate if a three pointer
        let isThree = false;
        let x = data[i].x;
        let y = data[i].y;
    
        //corner threes
        if((x<5.4 && y<14) || (x>44.5 && y<14)){
          isThree = true;
        }
        //based on radius of court three pointer and center of court (formula for a circle solved & rounded)
        if((y*y +x*x -50*x +625) > 552.25){
          isThree = true;
        }
        
        if(data[i].made===1){
          madeShots++;
          if(isThree){
            madeThrees++;
          }
        }
        if(isThree){
          totalThrees++;
        }
        totalShots++;
    }
    let averageShots = totalShots/this.state.allPlayers.length;
    let averageMadeShots = madeShots/this.state.allPlayers.length
    this.setState({
      leagueShootingPercentage:100*(madeShots/totalShots),
      leagueAverageTotalShots:averageShots,
      leagueAverageMadeShots:averageMadeShots,
      leagueAverageTotalThrees:totalThrees/this.state.allPlayers.length,
      leagueAverageMadeThrees:madeThrees/this.state.allPlayers.length,
      leagueShootingPercentageThrees:100*(madeThrees/totalThrees),
      leagueTrueShootingPercentage:100*(((3*madeThrees)+2*(madeShots-madeThrees))/(2*totalShots)),
    })
  };

  translateData = (data, target) => {
    //convert input data from canvas into readable scale and x,y layout for d3
    let array = [];
    for(let i=0; i<data.length;i++){
      let newShot={};
      newShot.x = Math.round(data[i].x); 
      newShot.y = Math.round(data[i].y); 
      newShot.z = data[i].z;
      newShot.shooter = data[i].shooter;
      newShot.made = data[i].made;
      newShot.attempts = 1;
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
            <div className="ml-10 d-f">
              <div><img className="logo-header" src={logo} alt="logo"></img></div>
            </div>
            <div className="a-r ml-20">
              <button className="btn-nav" onClick={() => this.redirect("logout")}>Logout</button>
              <button className="btn-nav" onClick={() => this.redirect("league")}>League Home</button>
              <button className="btn-nav" onClick={() => this.redirect("dashboard")}>Dashboard</button>
            </div>
          </div>  
        </div>

        {/* Page Content */}
        <div className="page-content-dashboard">
          <div className="ml-20 d-ib">
            <div className="mb-10 russo">Stats for Player: </div>
            <div>
              <select className="select-player" onChange={this.handleInputChange} value={this.state.selectedPlayer}>
                {this.state.allPlayers.map(player => (
                  <option key={player._id} value={player._id}>{player.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="ml-20 d-ib">
            <div className="mb-10 russo">Compare with Player: </div>
            <div>
              <select className="select-player" onChange={this.handleInputChange2} value={this.state.comparisonPlayer}>
              <option  value="None">None</option>
                {this.state.allPlayers.map(player => (
                  <option key={player._id} value={player._id}>{player.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="d-f">
            <div className="comparison-container">
              <div className="mt-20 mb-20 section-break"></div>
              <div className="ml-20 russo">Stats for: {this.state.selectedPlayerName}</div>
              <div className="">
                <div className="court-dashboard d-ib" id="chart1"></div>
                <div className="ml-50">
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
                      <tr>
                        <th>Made 3pt Shots</th>
                        <td>{this.state.madeThrees}</td>
                        <td>{Math.round(this.state.leagueAverageMadeThrees)}</td>
                      </tr>
                      <tr>
                        <th>Attempted 3pt Shots</th>
                        <td>{this.state.totalThrees}</td>
                        <td>{Math.round(this.state.leagueAverageTotalThrees)}</td>
                      </tr>
                      <tr>
                        <th>Shooting % 3pt Shots</th>
                        <td>{Math.round(this.state.shootingPercentageThrees)}%</td>
                        <td>{Math.round(this.state.leagueShootingPercentageThrees)}%</td>
                      </tr>
                      <tr>
                        <th>True Shooting %</th>
                        <td>{Math.round(this.state.trueShootingPercentage)}%</td>
                        <td>{Math.round(this.state.leagueTrueShootingPercentage)}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Show Comparison if one selected */}
            {this.state.showComparison &&  
            <div className="comparison-container">
              <div className="mt-20 mb-20 section-break"></div>
              <div className="ml-20 russo">Stats for: {this.state.comparisonPlayerName}</div>
              <div className="">
                <div className="court-dashboard d-ib" id="chart2"></div>
                <div className="ml-50">
                  <table>
                    <tbody>
                      <tr>
                        <th></th>
                        <th>Player Stats</th>
                        <th>League Average</th>
                      </tr>
                      <tr>
                        <th>Made</th>
                        <td>{this.state.comparisonMadeShots}</td>
                        <td>{Math.round(this.state.leagueAverageMadeShots)}</td>
                      </tr>
                      <tr>
                        <th>Attempted</th>
                        <td>{this.state.comparisonTotalShots}</td>
                        <td>{Math.round(this.state.leagueAverageTotalShots)}</td>
                      </tr>
                      <tr>
                        <th>Shooting %</th>
                        <td>{Math.round(this.state.comparisonShootingPercentage)}%</td>
                        <td>{Math.round(this.state.leagueShootingPercentage)}%</td>
                      </tr>
                      <tr>
                        <th>Made 3pt Shots</th>
                        <td>{this.state.comparisonMadeThrees}</td>
                        <td>{Math.round(this.state.leagueAverageMadeThrees)}</td>
                      </tr>
                      <tr>
                        <th>Attempted 3pt Shots</th>
                        <td>{this.state.comparisonTotalThrees}</td>
                        <td>{Math.round(this.state.leagueAverageTotalThrees)}</td>
                      </tr>
                      <tr>
                        <th>Shooting % 3pt Shots</th>
                        <td>{Math.round(this.state.comparisonShootingPercentageThrees)}%</td>
                        <td>{Math.round(this.state.leagueShootingPercentageThrees)}%</td>
                      </tr>
                      <tr>
                        <th>True Shooting %</th>
                        <td>{Math.round(this.state.comparisonTrueShootingPercentage)}%</td>
                        <td>{Math.round(this.state.leagueTrueShootingPercentage)}%</td>
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
