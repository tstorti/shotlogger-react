import React, { Component } from "react";
import { Nav } from "../../components/Nav";
import PlayerCard from "../../components/PlayerCard";
import "./league.css";

//placeholder data
import players from "./players.json";

class League extends Component {
  state = {
    allPlayers: players,
    articles: [],
    availablePlayers: players,
    team1:[],
    team2:[],
    currentTeam: "team1",
    team1BtnClass: "btn-active",
    team2BtnClass: "btn-inactive"
  };

  selectPlayer = id => {
    //add selected player list of players for selected team
 
    //grab index of the selected player based on id property
    let index = this.state.allPlayers.findIndex(p => p.id == id)
    let current = this.state.currentTeam;
    let newTeam;
    if(current === "team1"){
      newTeam = this.state.team1;
    }
    else{
      newTeam = this.state.team2;
    }
    
    let newPlayer = {
      id: this.state.allPlayers[index].id,
      name: this.state.allPlayers[index].name,
      image: this.state.allPlayers[index].image,
      position: this.state.allPlayers[index].position,
      height: this.state.allPlayers[index].height
    }
    newTeam.push(newPlayer);

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

  
  render() {
    return (
      <div>
        <Nav/> 
        <h2>League Home</h2>
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
