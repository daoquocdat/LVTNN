const express = require('express');
const router = express.Router();
const foodTypeController = require('../../app/controllers/admin/foodType.controller');

router.get('/index', foodTypeController.showFoodType);
// admin/foodtype/create
router.get('/create', foodTypeController.createForm);
router.post('/store', foodTypeController.store);

router.get('/:id/update', foodTypeController.updateForm);
router.put('/:id', foodTypeController.update);

router.delete('/:id', foodTypeController.delete);

module.exports = router;