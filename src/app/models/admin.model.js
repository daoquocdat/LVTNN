const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema= new Schema({
    name: { 
        type: String 
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    isDeleted: {
        type: Boolean
    }
});

module.exports = mongoose.model('admin', adminSchema);