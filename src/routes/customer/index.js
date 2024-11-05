var express = require("express");
const foodRouter = require('./food.route');
const router = express.Router();

router.use('/', foodRouter);
router.use('/food', foodRouter);

module.exports = router;