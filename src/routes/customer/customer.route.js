const express = require("express");
const router = express.Router();
const passport = require("passport");
const addressController = require("../../app/controllers/customer/address.controller");
const customerController = require("../../app/controllers/customer/customer.controller");
const upload = require("../../app/middlewares/multer");

router.get("/login", (req, res) =>
  res.render("customer/login", { layout: "login" })
);
router.get("/register", (req, res) =>
  res.render("customer/register", { layout: "login" })
);
router.post("/register", upload.single("avatar"), customerController.register);
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/login/google/callback",
  passport.authenticate("google", { session: false }),
  customerController.googleCallback
);

router.get('/', customerController.index);
router.get('/avatar', customerController.avatar);
router.get('/login', (req, res) => res.render('customer/login', {layout: 'login'}));
router.get('/address', addressController.customerAddressList);

module.exports = router;
