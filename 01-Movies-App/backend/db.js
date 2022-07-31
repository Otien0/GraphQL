const mongoose = require("mongoose");
const dotEnv   = require('dotenv');

dotEnv.config();

const dbUrl = process.env.MONGO_URI;

const connectDB = () => {
    mongoose.connect(dbUrl, { useUnifiedTopology: true , useNewUrlParser: true})
    const connection = mongoose.connection

    connection.on('connected' , () => {
        console.log('MongoDB Database Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })
}

module.exports = connectDB