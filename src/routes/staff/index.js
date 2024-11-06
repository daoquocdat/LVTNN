var express = require("express");
const router = express.Router();
const staffController = require('../../app/controllers/staff/staff.controller.js');
const orderRouter = require('./order.route.js');

router.get('/', staffController.index);
router.use('/order', require('./order.route.js'));

router.get('/login', (req, res) => {
    res.render('./staff/login', { layout: 'login' });
});


module.exports = router;