var express = require("express");
const router = express.Router();
const orderController = require('../../app/controllers/staff/order.controller.js');

router.post('/confirm/:id', orderController.confirmOrder);
router.post('/complete/:id', orderController.complete);
router.post('/cancel/:id', orderController.cancel); 
module.exports = router;