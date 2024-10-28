const express = require('express');
const router = express.Router();
const staffController = require('../../app/controllers/admin/staff.controller');

router.get('/', staffController.getAll);

module.exports = router;