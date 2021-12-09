import axios from "axios";

export default {
  // Gets league data for login
  getLeague: function(leagueData) { 
    return axios.post("/api/leagues/authenticate", leagueData);
  },
  // Saves a league to the database
  saveLeague: function(leagueData) {
    return axios.post("/api/leagues", leagueData);
  },
  //Save new Player
  savePlayer: function(playerData) {
    return axios.post("/api/players", playerData);
  },
  //Save new Shot
  saveShot: function(id,shotData) {
    //console.log(shotData);
    return axios.post("/api/players/"+id, shotData);
  },

  // Gets league data for player
  getShots: function(id) { 
    return axios.get("/api/players/"+id);
  },

  // Gets all shots for league
  getAllShots: function(id) { 
    //console.log("getting league shots");
    return axios.get("/api/shotlogs/"+id);
  },



};
