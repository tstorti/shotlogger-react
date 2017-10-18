import React, { Component } from "react";
import API from "../../utils/API";
import { Redirect } from 'react-router';
import logo from './logo.png';

class Shotlogger extends Component {
  state = {
    allPlayers:[],
    team1:[],
    team2:[],
    lastShot:{
      "shooter":"",
      "x":"",
      "y":"",
      "made":"",
      "shooterName":"",
      "outcome":"",
    },
    game:"",
    season:"",
    leagueID:"",
    shooter:"",
    shooterName:"",
    outcomeToggle:"made",

    madeBtnClass:"btn-active-shotlogger",
    missedBtnClass:"btn-inactive-shotlogger",
    team1BtnClasses: [],
    team2BtnClasses: [],

    redirectHome: false,
    redirectLeague:false,
    redirectDashboard: false,
  };

  //set state with team selections and init all the button classes on the toggles
  componentDidMount(){
    //console.log(this.props.location.state);
    let team1 = this.props.location.state.team1;
    let team2 = this.props.location.state.team2;
    let team1BtnClasses =["btn-active-shotlogger"];
    let team2BtnClasses =[];
    for(let i=1;i<team1.length;i++){
      team1BtnClasses.push("btn-inactive-shotlogger");
    }
    for(let i=0;i<team2.length;i++){
      team2BtnClasses.push("btn-inactive-shotlogger");
    }
    
    this.setState({
      allPlayers: this.props.location.state.allPlayers,
      team1: this.props.location.state.team1,
      team2: this.props.location.state.team2,
      game: this.props.location.state.gameName,
      season: this.props.location.state.season,
      shooter: this.props.location.state.team1[0].id,
      shooterName:this.props.location.state.team1[0].name,
      leagueID:this.props.location.state.leagueID,
      team1BtnClasses: team1BtnClasses,
      team2BtnClasses:team2BtnClasses,
    });

    var canvas = document.querySelector('canvas');
    // Make it visually fill the positioned parent
    canvas.style.width ='100%';
    canvas.style.height='100%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  //change current state for outcome and also classNames on make/miss button toggles
  changeOutcome = (outcome) => {
    if(outcome ==="made"){
      this.setState({
        madeBtnClass:"btn-active-shotlogger",
        missedBtnClass:"btn-inactive-shotlogger",
        outcomeToggle:"made",
      })
    }
    else{
      this.setState({
        madeBtnClass:"btn-inactive-shotlogger",
        missedBtnClass:"btn-active-shotlogger",
        outcomeToggle:"missed",
      })
    }
  };

  //change current state for shooter and also classNames on player button toggles
  changeShooter = (id, index, team, name) => {
    let team1BtnClasses =[];
    let team2BtnClasses =[];
    for(let i=0;i<this.state.team1.length;i++){
      team1BtnClasses.push("btn-inactive-shotlogger");
    }
    for(let i=0;i<this.state.team2.length;i++){
      team2BtnClasses.push("btn-inactive-shotlogger");
    }
    if(team === "team1"){
      team1BtnClasses.splice(index, 1, "btn-active-shotlogger");
    }
    else{
      team2BtnClasses.splice(index, 1, "btn-active-shotlogger");
    }
    
    this.setState({
      shooterName:name,
      shooter: id,
      team1BtnClasses:team1BtnClasses,
      team2BtnClasses:team2BtnClasses,
    });
  };

  //grab position on the canvas from where user clicks
  getPosition = event => {
    var elem = event.target
    var rect = elem.getBoundingClientRect();
    var x = event.clientX - rect.left; // x == the location of the click in the document - the location (relative to the left) of the canvas in the document
    var y = event.clientY - rect.top; // y == the location of the click in the document - the location (relative to the top) of the canvas in the document
    
    // This method will handle the coordinates and will draw them in the canvas.
    this.drawCoordinates(x,y);
  };

  //draw new point on the court with color based on make/miss
  drawCoordinates = (x,y) => {
    var canvas = document.querySelector('canvas');
    var pointSize = 8; // Change according to the size of the point.
    var ctx = document.getElementById("canvas").getContext("2d");

    let translatedX = x * (50/canvas.width);
    let translatedY = (canvas.height - y) *(35/canvas.height);
  

    if(this.state.outcomeToggle ==="missed"){
      this.setState({lastShot: {x: translatedX, y: translatedY, shooter:this.state.shooter, made:0, shooterName:this.state.shooterName, outcome:"Missed"}}, () =>{
        //save shot to the database
        //console.log(this.state.lastShot);
        this.saveShot();
      });
      
      ctx.fillStyle = "#801515"; // Red color	
  
    }
    else{
      this.setState({lastShot: {x: translatedX, y: translatedY, shooter:this.state.shooter, made:1, shooterName:this.state.shooterName, outcome:"Made"}}, () =>{
        //save shot to the database
        //console.log(this.state.lastShot);
        this.saveShot();
      });

      ctx.fillStyle = "#003E00"; // Green color	
    
    }
    
    ctx.beginPath(); //Start path
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a circle point using the arc function of the canvas with a point structure.
    ctx.fill(); // Close the path and fill.

  };

  //save last entry to the database
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
          
          //console.log(res);
        })
        .catch(err => console.log(err));
  };

  //redirect conditions based on nav
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
        <div className="page-content">
          <div className="court-container">
            <canvas onClick={this.getPosition} className="court" id="canvas"/>
          </div>
          <div className="">
            <div>
              {/* Team1 Toggles */}
              <div>
              <div className="mb-10 header-shotlogger ">Shooter:</div>
              </div>
              <div> 
                <div className="mb-5 header-shotlogger-sub">Team1</div>
                  {this.state.team1.map((player, index) => (
                    <div className="d-ib" key={player.id}>
                      <button className={this.state.team1BtnClasses[index]} onClick={() => this.changeShooter(player.id, index, "team1", player.name)}>{player.name}</button>
                    </div>
                  ))}
              </div>
              {/* Team2 Toggles */}
              <div>
                <div className="mb-5 header-shotlogger-sub">Team 2</div>
                  {this.state.team2.map((player,index) => (
                    <div className="d-ib" key={player.id}>
                      <button className={this.state.team2BtnClasses[index]} onClick={() => this.changeShooter(player.id, index, "team2", player.name)}>{player.name}</button>
                    </div>
                  ))}
              </div>
              {/* Outcome Toggle */}
              <div>
                <div className="mb-10 header-shotlogger">Outcome:</div>
                  <div>
                    <button className={this.state.madeBtnClass} onClick={() => this.changeOutcome("made")}>Make</button>
                    <button className={this.state.missedBtnClass} onClick={() => this.changeOutcome("miss")}>Miss</button>
                  </div>
              </div>
            </div>
            {/* Court */}
            
          </div>
            <div>
              <div className="header-shotlogger mb-5">Last Shot</div>
              <div className="mb-5 header-shotlogger-sub">Shooter: {this.state.lastShot.shooterName}</div>
              <div className="mb-5 header-shotlogger-sub">Outcome: {this.state.lastShot.outcome} </div>
            </div>
        </div>
      </div>
      
    );
  }
}

export default Shotlogger;
