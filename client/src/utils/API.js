import axios from "axios";

export default {
  // Gets all shotlogs
  getShotlogs: function() {
    return axios.get("/api/shotlogs/");
  },
  // Deletes the shotlog with the given id
  deleteShotlog: function(id) {
    return axios.delete("/api/shotlogs/" + id);
  },
  // Saves a shotlog to the database
  saveShotlog: function(shotlogData) {
    return axios.post("/api/shotlogs", shotlogData);
  },
  // Gets all leagues
  getLeagues: function() {
    return axios.get("/api/leagues/");
  },
  // Deletes the league with the given id
  deleteLeague: function(id) {
    return axios.delete("/api/leagues/" + id);
  },
  // Saves a league to the database
  saveLeague: function() {
    return axios.post("/api/leagues");
  },
  // Gets all players
  getPlayers: function(id) {
    return axios.get("/api/leagues" + id);
  },
  // // Deletes the league with the given id
  // deletePlayer: function(id) {
  //   return axios.delete("/api/players/" + id);
  // },
  // // Saves a league to the database
  // savePlayer: function(shotlogData) {
  //   return axios.post("/api/players", shotlogData);
  // },


};
