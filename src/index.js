var express = require("express");
var app = express();
const handlebars = require('express-handlebars'); // khai báo thư viện handlebars
const db = require('./config/db');
const usersModel = require('./app/models/users.model');
const router = require('./routes/index');
const path = require('path');
const port = 3000; // khai báo port

db.connect(); // kết nối database
app.listen(3000, () => console.log(`App listening at http://localhost:${port}`)) //lắng nghe port 3000

// cài đặt của thư viên handlebars
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers: require('./app/helpers/handlebars.js'),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

router(app); //route đường dẫn