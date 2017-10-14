import React, { Component } from "react";
import API from "../../utils/API";
import { Redirect } from 'react-router';



class Shotlogger extends Component {
  state = {
    allPlayers:[],
    team1:[],
    team2:[],
    shots:[],
    lastShot:{
      "shooter":"",
      "x":"",
      "y":"",
      "made":""
    },
    game:"",
    season:"",
    leagueID:"",
    shooter:"",
    outcomeToggle:"made",

    redirectHome: false,
    redirectLeague:false,
    redirectDashboard: false,
  };
  componentDidMount(){
    console.log(this.props.location.state);
    this.setState({
      allPlayers: this.props.location.state.allPlayers,
      team1: this.props.location.state.team1,
      team2: this.props.location.state.team2,
      game: this.props.location.state.gameName,
      season: this.props.location.state.season,
      shooter: this.props.location.state.team1[0].name,
      leagueID:this.props.location.state.leagueID,
    });
  };

  handleInputChange1 = event => {
    const { value } = event.target;
    this.setState({
      outcomeToggle: value,
    });
    console.log(value);
  };
  handleInputChange2 = event => {
    const { value } = event.target;
    this.setState({
      shooter: value,
    });
    console.log(value);
  };

  getPosition = event => {
    var elem = event.target
    var rect = elem.getBoundingClientRect();
    var x = event.clientX - rect.left; // x == the location of the click in the document - the location (relative to the left) of the canvas in the document
    var y = event.clientY - rect.top; // y == the location of the click in the document - the location (relative to the top) of the canvas in the document
    
    // This method will handle the coordinates and will draw them in the canvas.
    this.drawCoordinates(x,y);
  };

  drawCoordinates = (x,y) => {
    var pointSize = 8; // Change according to the size of the point.
    var ctx = document.getElementById("canvas").getContext("2d");

    

    if(this.state.outcomeToggle ==="missed"){
      this.setState({lastShot: {x: x, y: y, shooter:this.state.shooter, made:0}}, () =>{
        //save shot to the database
        console.log(this.state.lastShot);
        this.saveShot();
      });
      
      ctx.fillStyle = "#ff2626"; // Red color	
  
    }
    else{
      this.setState({lastShot: {x: x, y: y, shooter:this.state.shooter, made:1}}, () =>{
        //save shot to the database
        console.log(this.state.lastShot);
        this.saveShot();
      });

      ctx.fillStyle = "#0000FF"; // Blue color	
    
    }
    
    ctx.beginPath(); //Start path
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a circle point using the arc function of the canvas with a point structure.
    ctx.fill(); // Close the path and fill.

  };

  saveShot = () => {

    API.saveShot(this.state.lastShot.shooter, 
      {
        shooter:this.state.lastShot.shooter,
        made:this.state.lastShot.made,
        x:this.state.lastShot.x,
        y:this.state.lastShot.y,
        game:this.state.game,
        season:this.state.season,
        date: Date.now(),
        league:this.state.leagueID,
      })
        .then(res => {
          //console.log
          console.log(res);
        })
        .catch(err => console.log(err));
  };

  redirect = target =>{
    if(target === "dashboard"){
      this.setState({
        redirectDashboard:true,
      });
    }
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
  };

  render() {

    if (this.state.redirectDashboard) {
      return <Redirect to={{pathname:"/dashboard/" + this.props.match.params.id, state:{ allPlayers:this.state.allPlayers, leagueID:this.state.leagueID }}}/>;
    }
    if (this.state.redirectLeague) {
      return <Redirect to={{pathname:"/league/" + this.props.match.params.id, state:{ allPlayers:this.state.allPlayers, leagueID:this.state.leagueID }}}/>;
    }
    if (this.state.redirectHome) {
      return <Redirect to={"/"}/>;
    }
    
    return (
      <div>
        <div className="header">
          <div className="d-f">
          <h2 className="pageName">Shotlogger</h2>
            <div className="a-r">
              <button className="btn-nav" onClick={() => this.redirect("logout")}>Logout</button>
              <button className="btn-nav" onClick={() => this.redirect("league")}>League Home</button>
              <button className="btn-nav" onClick={() => this.redirect("dashboard")}>Dashboard</button>
            </div>
          </div>
        </div>
        <div className="d-f">
          <div>
            <div>
              <div>Team1</div>
                {this.state.team1.map(player => (
                  <div key={player.id}>
                    <input className="radio" type="radio" name="player" value={player.id} onChange={this.handleInputChange2}></input>
                    <label htmlFor="id">{player.name}</label>
                  </div>
                ))}
            </div>
            <div>
              <div>Team2</div>
                {this.state.team2.map(player => (
                  <div key={player.id}>
                    <input  type="radio" name="player" value={player.id} onChange={this.handleInputChange2}></input>
                    <label htmlFor="id">{player.name}</label>
                  </div>
                ))}
            </div>
            <div className="outcome-toggle">
              <div>Outcome:</div>
              <input  type="radio" name="outcome" value="made" checked={this.state.outcomeToggle === 'made'}
                  onChange={this.handleInputChange1}></input>
              <label>Made</label>
              <input type="radio" name="outcome" value="missed" checked={this.state.outcomeToggle === 'missed'}
                  onChange={this.handleInputChange1}></input>
              <label>Missed</label>
            </div>
          </div>
          <div className="court-container">
            <canvas onClick={this.getPosition} className="court" id="canvas" width="624" height="400"/>
          </div>
        </div>
          <div className="last">
            <div>Last Added</div>
            <div>Shooter: {this.state.lastShot.shooter}</div>
            <div>X Position: {this.state.lastShot.x} </div>
            <div>Y Postion: {this.state.lastShot.y}</div>
          </div>
      </div>
      
    );
  }
}

export default Shotlogger;
