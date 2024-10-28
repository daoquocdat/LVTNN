var express = require("express");
const foodRouter = require('./food.route');
const adminRouter = require('./admin.route');
const router = express.Router();

router.use('/', adminRouter); // -> /admin
router.use('/food', foodRouter); // -> /admin/food


module.exports = router;