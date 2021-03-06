const db = require("../models");

// Defining methods for the playersController
module.exports = {

  //save new player to the player collection and also put a reference in the league collection
  create: function(req, res) {
    db.Player
      .create(req.body)
      // .then(dbModel => res.json(dbModel))
      .then(dbModel => {
        console.log(req.body.leagueID);
        db.League.findOneAndUpdate({"_id":req.body.leagueID}, { $push: { "players": dbModel._id } }, { new: true }, function(err, newdoc) {
          if (err) {
            res.json(err);
          }
          else {
            res.json(newdoc);
          }
        });
      })
    .catch(err => res.status(422).json(err));

  },

  //save shot to database and also put a reference id in the players collection
  saveShot: function(req, res) {
    db.Shotlog
      .create(req.body)
      // .then(dbModel => res.json(dbModel))
      .then(dbModel => {
        console.log(req.body.shooter);
        db.Player.findOneAndUpdate({"_id":req.body.shooter}, { $push: { "shotlogs": dbModel._id } }, { new: true }, function(err, newdoc) {
          if (err) {
            res.json(err);
          }
          else {
            res.json(newdoc);
          }
        });
      })
    .catch(err => res.status(422).json(err));
  },

  getShots: function(req, res) {
    console.log(req.params.id);
    db.Shotlog
      .find({"shooter":req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

};
