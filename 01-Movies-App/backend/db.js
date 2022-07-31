const mongoose = require("mongoose");

const dbUrl = process.env.MONGO_URI || 'mongodb+srv://myUserAdmin:EVE6pJC0YZG3N1R1@cluster0.vlsqb.gcp.mongodb.net/Movie-App?retryWrites=true&w=majority';

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