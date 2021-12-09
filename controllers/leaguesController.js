const db = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Defining methods for the leaguesController
module.exports = {
  //route for individual league data - get players for player selection
  getLeague: function(req, res) {
    const { login, password } = req.body;
    db.League
      .findOne({"login":login})
      .populate("players")
      .then(dbModel => {
        //validate password before authenticating
        const hash = dbModel.password || "";
          bcrypt.compare(password, hash).then(function(result) {
            if (result) {
              res.json(dbModel);
            } else {
              res.status(401).json({ message: 'Authentication failed' })
            }
          });
      })
      .catch(err => res.status(401).json({ message: 'League ID not found' }));
  },

  create: function(req, res) {
    const { login, password } = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store password hash in DB.
        db.League
          .create({ login, password: hash })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      });
  },
};
