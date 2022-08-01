const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please Enter movie Title"],
    },
    genre: {
        type: String,
        required: [true, "Please Enter movie Genre"],
    },
    directorId: {
        type: String
    }
})

module.exports = mongoose.model("Movies", movieSchema);
