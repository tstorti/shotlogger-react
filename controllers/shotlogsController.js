const db = require("../models");

// Defining methods for the shotlogsController
module.exports = {

  getAllShots: function(req, res) {
    console.log(req.params.id);
    db.Shotlog
      .find({"league":req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

};
