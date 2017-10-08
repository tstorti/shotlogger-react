import axios from "axios";

export default {
  // Saves a league to the database
  saveLeague: function(leagueData) {
    return axios.post("/api/leagues", leagueData);
  },
  // Gets league data for login
  getLeague: function(login) {
    return axios.get("/api/leagues/"+login);
  },
  //Save new Player
  savePlayer: function(playerData) {
    console.log("saving player");
    return axios.post("/api/players", playerData);
  },
  // Gets all players
  getPlayers: function(id) {
    return axios.get("/api/leagues" + id);
  },

  
  
  // // Gets all shotlogs
  // getShotlogs: function() {
  //   return axios.get("/api/shotlogs/");
  // },
  // // Deletes the shotlog with the given id
  // deleteShotlog: function(id) {
  //   return axios.delete("/api/shotlogs/" + id);
  // },
  // // Saves a shotlog to the database
  // saveShotlog: function(shotlogData) {
  //   return axios.post("/api/shotlogs", shotlogData);
  // },

  
  
  // // Deletes the league with the given id
  // deletePlayer: function(id) {
  //   return axios.delete("/api/players/" + id);
  // },
  // // Saves a league to the database



};
