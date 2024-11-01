const adminRouter = require('./admin');
const customerRouter = require('./customer/');
const staffRouter = require('./staff/');


function router(app) {
    app.use('/', customerRouter);
    app.use('/admin', adminRouter);
    app.use('/staff', staffRouter);
}

module.exports = router;