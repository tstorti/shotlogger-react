const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/shotlogs",
  {
    useMongoClient: true
  }
);

const shotlogSeed = [
  {
    x: 0,
    y: 0,
    shooter: 'Alex Caruso',
    league: 'Avondale Park',
    made: 0,
    game: '001',
    season: '2020',
  },
];

db.Shotlog
  .remove({})
  .then(() => db.Shotlog.collection.insertMany(shotlogSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
