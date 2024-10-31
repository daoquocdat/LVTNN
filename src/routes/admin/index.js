var express = require("express");
const foodRouter = require('./food.route');
const foodTypeRouter = require('./foodType.route');
const adminRouter = require('./admin.route');
const router = express.Router();

router.use('/', adminRouter); // -> /admin
router.use('/foodType', foodTypeRouter); // -> /admin/foodType
router.use('/food', foodRouter); // -> /admin/food

module.exports = router;