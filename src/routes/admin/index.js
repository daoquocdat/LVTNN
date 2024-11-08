var express = require("express");
const foodRouter = require('./food.route');
const foodTypeRouter = require('./foodType.route');
const adminRouter = require('./admin.route');
const router = express.Router();
const { checkAuthAdmin } = require("../../app/common/checkAuthentication");
router.use('/', adminRouter); // -> /admin
router.use('/foodType', checkAuthAdmin, foodTypeRouter); // -> /admin/foodType
router.use('/food', checkAuthAdmin, foodRouter); // -> /admin/food

module.exports = router;