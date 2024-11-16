const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema= new Schema({

});

module.exports = mongoose.model('customer', customerSchema);