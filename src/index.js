var express = require("express");
var app = express();
const handlebars = require("express-handlebars"); // khai báo thư viện handlebars
const db = require("./config/db"); // khai báo database
const router = require("./routes/index"); // khai báo route
const path = require("path"); // khai báo path
const port = 3000; // khai báo port
const dotenv = require("dotenv"); // khai báo dotenv
const bodyParser = require("body-parser"); // khai báo body-parser
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override"); // khai báo method-override
const upload = require("./app/middlewares/multer"); // khai báo multer

// cài đặt body-parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// cài đặt dotenv
require("dotenv").config();

db.connect(); // kết nối database
app.listen(3000, () =>
  console.log(`App listening at http://localhost:${port}`)
); //lắng nghe port 3000

// cài đặt của thư viên handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: require("./app/helpers/handlebars.js"),
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// cài đặt public folder là thư mục chữa file static
app.use(express.static(path.join(__dirname, "public")));

// cài đặt router override
app.use(methodOverride("_method"));

router(app); //route đường dẫn
