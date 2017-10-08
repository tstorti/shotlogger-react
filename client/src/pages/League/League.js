import React, { Component } from "react";
import { Redirect } from 'react-router';
import { Nav } from "../../components/Nav";
import PlayerCard from "../../components/PlayerCard";
import Input from "../../components/Input";
import "./league.css";

//placeholder data
import players from "./players.json";

class League extends Component {
  state = {
    allPlayers: players,
    articles: [],
    availablePlayers: players,
    newName:"",
    newHeight:"",
    newImage:"",
    newPosition:"",

    showNewPlayerForm:false,
    team1:[],
    team2:[],
    currentTeam: "team1",
    team1BtnClass: "btn-active",
    team2BtnClass: "btn-inactive",

    redirectHome: false,
    redirectDashboard: false,
    redirectShotlogger:false,


  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  newPlayerDialog = () => {
    this.setState({
      showNewPlayerForm: true,
    });
  };

  saveNewPlayer = () => {
    //do api call, reset state
    console.log(this.state.newName);
    console.log(this.state.newHeight);
    console.log(this.state.newPosition);
    console.log(this.state.newImage);
    this.setState({
      showNewPlayerForm: false,
    });
  };

  selectPlayer = id => {
    //add selected player list of players for selected team
 
    //grab index of the selected player based on id property
    let index = this.state.allPlayers.findIndex(p => p.id === id)
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
      id: this.state.allPlayers[index].id,
      name: this.state.allPlayers[index].name,
      image: this.state.allPlayers[index].image,
      position: this.state.allPlayers[index].position,
      height: this.state.allPlayers[index].height
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
    

    // //remove player from list of available players
    // let newAvailable = this.state.availablePlayers;
    // newAvailable = newAvailable.splice(index, 1);
    // this.setState({
    //   availablePlayers: newAvailable
    // });
    // //this is correctly showing an array of 5 players but not rerendering list correctly below
    // console.log(this.state.availablePlayers);
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
    if(target === "dashboard"){
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
      this.setState({
        redirectShotlogger:true,
      });
    }
  };

  
  render() {

    if (this.state.redirectDashboard) {
      return <Redirect to={"/dashboard/" + this.props.match.params.id}/>;
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
        <h2>League Home</h2>
        {/* Player Creation */}
        <div>
          <button onClick={() => this.newPlayerDialog()}>Add New Player</button>
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
                <button onClick={() => this.saveNewPlayer()}>Save New Player</button>
              </div>
            </div>
          } 
        </div>
        {/* Player Selection */}
        <div>
          <div className="d-f">
            <div>Player Pool</div>
            {this.state.availablePlayers.map(player => (
              <PlayerCard
                selectPlayer={this.selectPlayer}
                id={player.id}
                key={player.id}
                name={player.name}
                image={player.image}
                position={player.position}
                height={player.height}
              />
            ))}
          </div>
          {/* Team Toggle Container */}
          <div>
            <button onClick={() => this.selectTeam('team1')} className={this.state.team1BtnClass}>Team 1</button>
            <button onClick={() => this.selectTeam('team2')} className={this.state.team2BtnClass}>Team 2</button>
          </div>
          {/* Team Selections Container */}
          <div className="d-f">
            {/* Team 1 Container */}
            <div className="f-1">
              <div>Team 1</div>
              {this.state.team1.map(player => (
                  <PlayerCard
                    selectPlayer={this.selectPlayer}
                    id={player.id}
                    key={player.id}
                    name={player.name}
                    image={player.image}
                    position={player.position}
                    height={player.height}
                  />
                ))}
            </div>
            <div className="f-1">
              {/* Team 2 Container */}
              <div>Team 2</div>
              {this.state.team2.map(player => (
                  <PlayerCard
                    selectPlayer={this.selectPlayer}
                    id={player.id}
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
