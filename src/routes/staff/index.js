var express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('staff/staff', { layout: 'staff' });
});

router.get('/login', (req, res) => {
    res.render('./staff/login', { layout: 'login' });
});


module.exports = router;