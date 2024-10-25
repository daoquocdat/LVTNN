var express = require("express");
const foodRouter = require('./food.route');
const router = express.Router();

router.use('/', foodRouter);

module.exports = router;