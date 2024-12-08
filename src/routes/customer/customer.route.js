const express = require('express');
const router = express.Router();
const addressController = require('../../app/controllers/customer/address.controller');

router.get('/login', (req, res) => res.render('customer/login', {layout: 'login'}));
router.get('/address', addressController.customerAddressList);
module.exports = router;