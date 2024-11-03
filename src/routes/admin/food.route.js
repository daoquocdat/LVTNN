const express = require('express');
const router = express.Router();
const foodController = require('../../app/controllers/admin/food.controller');
const upload = require('../../app/middlewares/multer');

// admin/food
router.get('/index', foodController.getAll);
// admin/food/create
router.get('/create', foodController.create);
router.post('/store', upload.single('image'), foodController.store);

router.get('/delete', foodController.delete);

router.get('/update', foodController.update);

module.exports = router;