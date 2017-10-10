import axios from "axios";

export default {
  // Saves a league to the database
  saveLeague: function(leagueData) {
    return axios.post("/api/leagues", leagueData);
  },
  //Save new Player
  savePlayer: function(playerData) {
    console.log("saving player");
    return axios.post("/api/players", playerData);
  },
  // Gets all players for current league
  getPlayers: function(leagueName) {
    return axios.get("/api/leagues/" + leagueName);
  },


};
