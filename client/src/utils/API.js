import axios from "axios";

export default {
  // Gets league data for login
  getLeague: function(login) { 
    return axios.get("/api/leagues/"+login);
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
    return axios.post("/api/players/"+id, shotData);
  },

  // Gets league data for login
  getShots: function(id) { 
    return axios.get("/api/players/"+id);
  },



};
