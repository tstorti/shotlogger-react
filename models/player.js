// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var PlayerSchema = new Schema({
// title is a required string
    name: {
        type: String,
        required: true
    },
    height:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false
    },
    position:{
        type: String,
        required: true
    },
    // this saves player ids
    shotlogs: [{
        type: Schema.Types.ObjectId,
        ref: "Shotlog"
    }]
});

// Create the League model with the LeagueSchema
var Player = mongoose.model("Player", PlayerSchema);

// Export the model
module.exports = Player;
