const db = require("../models");

// Defining methods for the playersController
module.exports = {

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

  saveShot: function(req, res) {
    // db.Shotlog
    //   .create(req.body)
    //   // .then(dbModel => res.json(dbModel))
    //   .then(dbModel => {
    //     console.log(req.body.leagueID);
    //     db.Player.findOneAndUpdate({"_id":req.body.leagueID}, { $push: { "players": dbModel._id } }, { new: true }, function(err, newdoc) {
    //       if (err) {
    //         res.json(err);
    //       }
    //       else {
    //         res.json(newdoc);
    //       }
    //     });
    //   })
    // .catch(err => res.status(422).json(err));

  },

};
