// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var LeagueSchema = new Schema({
// title is a required string
    name: {
        type: String,
        required: true
    },
    home:{
        type: Date,
        required: true
    },
    // this saves player ids
    players: [{
        type: Schema.Types.ObjectId,
        ref: "Player"
    }]
});

// Create the League model with the LeagueSchema
var League = mongoose.model("League", LeagueSchema);

// Export the model
module.exports = League;
