const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://fastfood:tuantu_1712@cluster0.45yku.mongodb.net/fastfood', {
            

            
        });
        // mongoose.connect('mongodb://localhost:27017/lvtu', {
        //   });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
        console.log('Error',error);
    }
}

module.exports = { connect };