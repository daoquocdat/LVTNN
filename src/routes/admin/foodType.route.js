const express = require('express');
const router = express.Router();
const foodTypeController = require('../../app/controllers/admin/foodType.controller');

router.get('/index', foodTypeController.showFoodType);
// admin/foodtype/create
router.get('/create', foodTypeController.createForm);
router.post('/store', foodTypeController.store);

module.exports = router;