const express = require('express');
const router = express.Router();
const foodController = require('../../app/controllers/admin/food.controller');

// admin/food
router.get('/index', foodController.getAll);
router.get('/create', foodController.create);
router.get('/delete', foodController.delete);
router.get('/update', foodController.update);

module.exports = router;