const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const directorSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter directors's Name"],
    },
    age: {
        type: Number,
        required: [true, "Please Enter directors's Age"],
    }
})

module.exports = mongoose.model("Directors", directorSchema);
