const db = require("../models");

// Defining methods for the articlesController
module.exports = {


  // findAll: function(req, res) {
  //   db.Shotlog
  //     .find(req.query)
  //     .sort({ date: -1 })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // create: function(req, res) {
  //   db.Shotlog
  //     .create(req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  //     console.log(req.body);
  // },


  //get all players for league with populate
  findAll: function(req, res) {
    db.League
      .find({"login":req.params.id})
      .populate("players")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  get: function(req, res) {
    console.log(req.params.id);
    db.League
      .find({"login":req.params.id})
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

// User.find({})
// // ..and on top of that, populate the notes (replace the objectIds in the notes array with bona-fide notes)
// .populate("notes")
// // Now, execute the query
// .exec(function(error, doc) {
//   // Send any errors to the browser
//   if (error) {
//     res.send(error);
//   }
//   // Or send the doc to the browser
//   else {
//     res.send(doc);
//   }
// });