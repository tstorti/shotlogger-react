import React, { Component } from "react";
import { Redirect } from 'react-router';
import API from "../../utils/API";
import PlayerCard from "../../components/PlayerCard";
import Input from "../../components/Input";
import "./league.css";

//placeholder data
//import players from "./players.json";

class League extends Component {
  state = {
    allPlayers: [],
    articles: [],
    availablePlayers: [],
    leagueID:"",
    newName:"",
    newHeight:"",
    newImage:"",
    newPosition:"",

    gameName:"",
    seasonName:"Winter 2017/18",

    showNewPlayerForm:false,
    team1:[],
    team2:[],
    currentTeam: "team1",
    team1BtnClass: "btn-active",
    team2BtnClass: "btn-inactive",

    redirectHome: false,
    redirectDashboard: false,
    redirectShotlogger:false,

    warningCreation:"",
    warningShotlog:"",
  };

  componentDidMount(){
    console.log(this.props.location.state);
    let players = this.props.location.state.allPlayers
    players = [...players];

    this.setState({
      allPlayers: this.props.location.state.allPlayers,
      availablePlayers: players,
      leagueID: this.props.location.state.leagueID, 
    });
    
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleInputChange2 = event =>{
    this.setState({seasonName: event.target.value});
  }

  newPlayerDialog = () => {
    this.setState({
      showNewPlayerForm: !this.state.showNewPlayerForm,
    });
  };

  saveNewPlayer = () => {
    if(this.state.newName ==="" || this.state.newHeight==="" || this.state.newPostion==="" || this.state.newImage ===""){
      this.setState({
        warningCreation:"You must fill in all fields",
      });
    }
    //do api call, reset state to hide form
    else{
      API.savePlayer(
      {
        name:this.state.newName,
        height:this.state.newHeight,
        position:this.state.newPosition,
        image:this.state.newImage,
        leagueID: this.state.leagueID,
      })
        .then(res => {
          API.getLeague(this.props.match.params.id)
          .then(res => {
            //reset state with new available players and all players
            let newPlayer = res.data[0].players[res.data[0].players.length-1];
            let array = this.state.allPlayers;
            let array2= this.state.availablePlayers;
            array.push(newPlayer);
            array2.push(newPlayer);
            this.setState({
              showNewPlayerForm: false,
              warningCreation:"",
              newName:"",
              newHeight:"",
              newPosition:"",
              newImage:"",
              allPlayers:array,
              availablePlayers:array2,
            });
          
          })
          .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }    
  };

  selectPlayer = id => {
    //add selected player list of players for selected team

    //grab index of the selected player based on id property
    let index = this.state.availablePlayers.findIndex(p => p._id === id)
    let current = this.state.currentTeam;
    
    //define temporary teamArray to replace state
    let newTeam;
    if(current === "team1"){
      newTeam = this.state.team1;
    }
    else{
      newTeam = this.state.team2;
    }
    //define temporary newPlayer object
    let newPlayer = {
      id: this.state.availablePlayers[index]._id,
      key: this.state.availablePlayers[index]._id,
      name: this.state.availablePlayers[index].name,
      image: this.state.availablePlayers[index].image,
      position: this.state.availablePlayers[index].position,
      height: this.state.availablePlayers[index].height
    }
    newTeam.push(newPlayer);

    //add to appropriate array in the state
    if(current === "team1"){
      this.setState({
        team1: newTeam
      });
    }
    else{
      this.setState({
        team2: newTeam
      });
    }
    //remove player from list of available players
    this.state.availablePlayers.splice(index, 1);
  };

  selectTeam = team => {
    if(team === "team1"){
      this.setState({
        currentTeam: "team1",
        team1BtnClass: "btn-active",
        team2BtnClass: "btn-inactive"
      });
    }
    else{
      this.setState({
        currentTeam: "team2",
        team1BtnClass: "btn-inactive",
        team2BtnClass: "btn-active"
      });
    }
  };

  redirect = target =>{
    if(target === "dashboard" ){
      
      this.setState({
        redirectDashboard:true,
      });
    }
    if(target === "logout"){
      this.setState({
        redirectHome:true,
      });
    }
    if(target === "shotlogger"){
      //check to make sure required info has been selected to log game stats
      if(!this.state.team1[0] && !this.state.team2[0]){
        this.setState({
          warningShotlog:"You must select at least one player to log shots",
        });
      }
      else if(this.state.gameName ===""){
        this.setState({
          warningShotlog:"You must provide a game name to log shots",
        });
      }
      else{
        this.setState({
          redirectShotlogger:true,
        });
      }
      
    }
  };

  
  render() {

    if (this.state.redirectDashboard) {
      return <Redirect to={{pathname:"/dashboard/" + this.props.match.params.id, state:{ allPlayers:this.state.allPlayers, leagueID:this.state.leagueID }}}/>;
    }
    if (this.state.redirectHome) {
      return <Redirect to={"/"}/>;
    }
    if (this.state.redirectShotlogger) {
      return <Redirect to={{pathname:"/shotlogger/" + this.props.match.params.id, state:{ team1:this.state.team1, team2:this.state.team2, gameName:this.state.gameName, season:this.state.seasonName, allPlayers:this.state.allPlayers, leagueID:this.state.leagueID }}} />;
    }

    return (
      <div>
        <div className="header">
          <div className="d-f">
            <h2 className="pageName">League Home</h2>
            <div className="a-r">
              <button className="btn-nav" onClick={() => this.redirect("logout")}>Logout</button>
              <button className="btn-nav" onClick={() => this.redirect("shotlogger")}>Shotlogger</button>
              <button className="btn-nav" onClick={() => this.redirect("dashboard")}>Dashboard</button>
            </div>
          </div>  
        </div>
        <div className="d-f">
          {/* Season and Game Settings */}
          <div className="d-f">
            <div className="dropdown-container">
              <div>Current Season</div>
              <div>
                <select onChange={this.handleInputChange2} value={this.state.seasonName}>
                  <option value="Summer 2017">Summer 2017</option>
                  <option value="Fall 2017">Fall 2017</option>
                  <option value="Winter 2017/18">Winter 2017/2018</option>
                  <option value="Spring 2018">Spring 2018</option>
                </select>
              </div>
            </div>
            
          </div>
          {/* Player Creation */}
          <div className="a-r">
            <button className="btn-new" onClick={() => this.newPlayerDialog()}>Add New Player</button>
          </div>
          <div className="modalOuter">
            {this.state.showNewPlayerForm &&
              <div className="newPlayerModal"> 
                <div className="modalContent">
                  <Input
                    name="newName"
                    value={this.state.newName}
                    onChange={this.handleInputChange}
                    placeholder="Name"
                  />
                  <Input
                    name="newPosition"
                    value={this.state.newPosition}
                    onChange={this.handleInputChange}
                    placeholder="Position"
                  />
                  <Input
                    name="newHeight"
                    value={this.state.newHeight}
                    onChange={this.handleInputChange}
                    placeholder="Height"
                  />
                  <Input
                    name="newImage"
                    value={this.state.newImage}
                    onChange={this.handleInputChange}
                    placeholder="Image Link"
                  />
                </div>
                <div>
                  <div className="warningMsg" >{this.state.warningCreation}</div>
                </div>
                <div>
                  <button onClick={this.saveNewPlayer}>Save New Player</button>
                  <button onClick={() => this.newPlayerDialog()}>Close</button>
                </div>
              </div>
            } 
          </div>
        </div>

        
        {/* Player Selection */}
        <div>
          <div className="player-pool-container">
            <div className="header2">Availabile Players</div>
             <div className="d-f" >
            {/* Team Toggle Container */}
       
              {this.state.availablePlayers.map(player => (
                <PlayerCard
                  selectPlayer={this.selectPlayer}
                  id={player._id}
                  key={player._id}
                  name={player.name}
                  image={player.image}
                  position={player.position}
                  height={player.height}
                />
              ))}
            </div>
          </div>
          
          {/* Team Selections Container */}
          <div className="d-f">
            <div className="game-name-input">Set GameName</div>
            <div className="m-r">
              <Input
                name="gameName"
                value={this.state.gameName}
                onChange={this.handleInputChange}
                placeholder="Enter a name for the game"
              />
            </div>
            <button className="btn-nav" onClick={() => this.redirect("shotlogger")}>Go to Shotlogger</button>
            <div className="warningMsg">{this.state.warningShotlog}</div>
          </div>
          <div className="d-f">
            <div>
              <div className="team-btn-container"> 
                <div>
                  <button onClick={() => this.selectTeam('team1')} className={this.state.team1BtnClass}>Team 1</button>
                </div>
                <div>  
                  <button onClick={() => this.selectTeam('team2')} className={this.state.team2BtnClass}>Team 2</button>
                </div>
              </div>
            </div>
            {/* Team 1 Container */}
            <div className="f-1 roster-container">
              <div>Team 1 Roster</div>
              {this.state.team1.map(player => (
                  <PlayerCard
                    selectPlayer={this.selectPlayer}
                    id={player._id}
                    key={player.id}
                    name={player.name}
                    image={player.image}
                    position={player.position}
                    height={player.height}
                  />
                ))}
            </div>
            <div className="f-1 roster-container">
              {/* Team 2 Container */}
              <div>Team 2 Roster</div>
              {this.state.team2.map(player => (
                  <PlayerCard
                    selectPlayer={this.selectPlayer}
                    id={player._id}
                    key={player.id}
                    name={player.name}
                    image={player.image}
                    position={player.position}
                    height={player.height}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default League;
