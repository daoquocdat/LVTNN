var express = require("express");
const router = express.Router();
const promotionController = require('../../app/controllers/admin/promotion.controller.js');

router.get('/index', promotionController.index);
router.get('/create', promotionController.create);
router.post('/store', promotionController.store);

module.exports = router