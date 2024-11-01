var express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('./staff/staff', { layout: 'staff' });
});


module.exports = router;