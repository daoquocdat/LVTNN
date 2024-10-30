const express = require('express');
const router = express.Router();
const adminController = require('../../app/controllers/admin/admin.controller');

router.get('/', adminController.index);
router.get('/login', adminController.loginform);
router.get('/:id', adminController.getOne);
router.post('/', adminController.create);
router.delete('/:id', adminController.delete);
router.put('/:id', adminController.update);
router.delete('/:id/soft', adminController.softDelete);
router.put('/:id/restore', adminController.restore);
router.post('/login', adminController.login);

module.exports = router;