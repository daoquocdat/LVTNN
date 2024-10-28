const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema= new Schema({
    name: { 
        type: String 
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    
});

module.exports = mongoose.model('staff', staffSchema);