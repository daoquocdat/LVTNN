const adminRouter = require('./admin');
const customerRouter = require('./customer/');


function router(app) {
    app.use('/', customerRouter);
    app.use('/admin', adminRouter);
    
}

module.exports = router;