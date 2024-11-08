const adminRouter = require("./admin");
const customerRouter = require("./customer/");
const staffRouter = require("./staff/");
const {
  checkAuth,
  checkAuthAdmin,
} = require("../app/common/checkAuthentication");

function router(app) {
  app.use("/", customerRouter);
  app.use("/admin", checkAuth, adminRouter);
  app.use("/staff", staffRouter);
}

module.exports = router;
