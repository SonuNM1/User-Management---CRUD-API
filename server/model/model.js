const mongoose = require('mongoose');

// Defining the schema for the user model

var schema = new mongoose.Schema({

    // defining the 'name' field as a required string

    name : {
        type : String,
        required: true
    },

    // defining the 'email' field as a required, unique string

    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : String,
    status : String
})

const Userdb = mongoose.model('userdb', schema); // Creating the user model using the defined schema

module.exports = Userdb;