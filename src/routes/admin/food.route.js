const express = require('express');
const router = express.Router();
const foodController = require('../../app/controllers/admin/food.controller');

router.get('/', foodController.getAll);
router.get('/create', foodController.create);

module.exports = router;