// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ShotlogSchema = new Schema({
// title is a required string
    x: {
        type: Number,
        required: true
    },
    y:{
        type: Number,
        required: true
    },
    shooter: {
        type: String,
        required: true
    },
    league:{
        type: String,
        required: true
    },
    made: {
        type: Number,
        required: true
    },
    game: {
        type: String,
        required: true,
    },
    season:{
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

// Create the Article model with the ArticleSchema
var Shotlog = mongoose.model("Shotlog", ShotlogSchema);

// Export the model
module.exports = Shotlog;
