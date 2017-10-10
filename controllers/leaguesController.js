const db = require("../models");

// Defining methods for the leaguesController
module.exports = {

  //route for initial login
  findAll: function(req, res) {
    db.League
      .find({"login":req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  //route for individual league data - get players for player selection
  getPlayers: function(req, res) {
    console.log(req.params.id);
    db.League
      .find({"login":req.params.id})
      .populate("players")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    db.League
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
      console.log(req.body);
  },
};
