var express = require("express");
const router = express.Router();

const foodRouter = require('./food.route');
const foodTypeRouter = require('./foodType.route');
const adminRouter = require('./admin.route');
const orderRouter = require('./order.route.js');

router.use('/', adminRouter); // -> /admin
router.use('/foodType', foodTypeRouter); // -> /admin/foodType
router.use('/food', foodRouter); // -> /admin/food
router.use('/order', orderRouter); // -> /admin/order

module.exports = router;