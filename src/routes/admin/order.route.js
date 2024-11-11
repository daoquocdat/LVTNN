var express = require("express");
const { route } = require("./food.route");
const router = express.Router();
const orderController = require('../../app/controllers/admin/order.controller.js');

router.get('/index', orderController.getAll);

module.exports = router