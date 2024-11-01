var express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('./order/new', { layout: 'staff' });
});


module.exports = router;