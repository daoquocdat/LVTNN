var express = require("express");
const router = express.Router();
const foodRouter = require('./food.route.js');
const customerRouter = require('./customer.route.js');
const orderRouter = require('./order.route.js');

router.use('/', foodRouter);
router.use('/food', foodRouter);
router.use('/customer', customerRouter);
router.use('/order', orderRouter);
router.get('/cart', (req, res) => res.render('cart/index', { layout: 'main' }));

module.exports = router;