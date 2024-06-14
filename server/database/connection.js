const mongoose = require('mongoose');

// Asynchronous function to connect to the MongoDB database 

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB connected : ${con.connection.host}`); // logging the host of the connected MongoDB server
    }catch(err){
        console.log(err);
        process.exit(1); // exiting the process with a failure code
    }
}

module.exports = connectDB