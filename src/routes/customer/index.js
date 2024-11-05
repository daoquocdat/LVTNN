var express = require("express");
const foodRouter = require('./food.route.js');
const customerRouter = require('./customer.route.js');
const router = express.Router();

router.use('/', foodRouter);
router.use('/food', foodRouter);
router.use('/customer', customerRouter);

module.exports = router;