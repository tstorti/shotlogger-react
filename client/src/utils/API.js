import axios from "axios";

export default {
  // Gets league data for login
  getLeague: function(login) { 
    console.log("getting league data");
    return axios.get("/api/leagues/"+login);
  },
  // Saves a league to the database
  saveLeague: function(leagueData) {
    return axios.post("/api/leagues", leagueData);
  },
  //Save new Player
  savePlayer: function(playerData) {
    console.log("saving player");
    return axios.post("/api/players", playerData);
  },
  //Save new Shot
  saveShot: function(id,shotData) {
    console.log("saving shot");
    console.log(id);
    console.log(shotData);
    return axios.post("/api/players/"+id, shotData);
  },



};
