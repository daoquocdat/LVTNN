const express = require('express');
const router = express.Router();
const foodTypeController = require('../../app/controllers/admin/foodType.controller');

router.get('/index', foodTypeController.showFoodType);
router.get('/create', foodTypeController.create);

module.exports = router;