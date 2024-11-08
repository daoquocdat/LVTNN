const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema= new Schema({
    name: { 
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean
    }
});

module.exports = mongoose.model('admin', adminSchema);

adminSchema.pre('validate', function(next) {
    if (!this.name || !this.username || !this.password) {
        next(new Error('Cần cung cấp field'));
    } else {
        next();
    }
});
