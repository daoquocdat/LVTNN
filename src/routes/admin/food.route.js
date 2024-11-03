const express = require('express');
const router = express.Router();
const foodController = require('../../app/controllers/admin/food.controller');
const upload = require('../../app/middlewares/multer');

// admin/food
router.get('/index', foodController.getAll);
// admin/food/create
router.get('/create', foodController.create);
router.post('/store', upload.single('image'), foodController.store);

// admin/food/delete
router.delete('/:id', foodController.delete);

// admin/food/update
router.get('/:id/edit', foodController.edit);
router.put('/:id/update', upload.single('image'), foodController.update);

module.exports = router;