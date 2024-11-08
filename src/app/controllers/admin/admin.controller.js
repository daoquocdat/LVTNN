const bcrypt = require("bcrypt");
const adminModel = require("../../models/admin.model");
const { generateToken } = require("../../common/generateToken");

class AdminController {
  // [GET] /admin
  index(req, res) {
    res.render("admin/admin", { layout: "admain" });
  }
  getOne(req, res) {
    const id = req.params.id;

    adminModel
      .findOne({ id, isDeleted: false })
      .then((admin) => {
        res.json(admin);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async create(req, res) {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    const admin = new adminModel({
      username: req.body.username,
      password: passwordHash,
      name: req.body.name,
      isDeleted: false,
    });
    admin
      .save()
      .then((admin) => {
        res.json(admin);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  delete(req, res) {
    const id = req.params.id;
    adminModel
      .findByIdAndDelete(id)
      .then((admin) => {
        res.json(admin);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  update(req, res) {
    const id = req.params.id;
    adminModel
      .findByIdAndUpdate(id, {
        name: req.body.name,
      })
      .then((admin) => {
        res.json(admin);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  softDelete(req, res) {
    const id = req.params.id;
    adminModel
      .findByIdAndUpdate(id, { isDeleted: true })
      .then((admin) => {
        res.json(admin);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  restore(req, res) {
    const id = req.params.id;
    adminModel
      .findByIdAndUpdate(id, { isDeleted: false })
      .then((admin) => {
        res.json(admin);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // [GET] /admin/login
  loginform(req, res) {
    res.render("admin/login", { layout: "login" });
  }

  // [POST] /admin/login
  async login(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    adminModel
      .findOne({ username })
      .then(async (admin) => {
        if (!admin) {
          return res.json("Tai khoan khong ton tai");
        }
        const passwordCompare = await bcrypt.compare(password, admin.password);
        if (!passwordCompare) {
          return res.json("Sai mat khau");
        }
        const accessTokenSecret = process.env.ACCESS_TOKEN_ADMIN_SECRET;

        const accessToken = await generateToken(
          { id: admin._id },
          accessTokenSecret
        );
        console.log(accessToken, "accessToken");
        res.cookie("accessTokenAdmin", accessToken, {
          maxAge: 900000,
          httpOnly: true,
        });
        const cookieA = req.cookies["accessTokenAdmin"];
        console.log(cookieA, "cookieA");
        res.redirect("/admin");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // [GET] /admin/logout
  logout(req, res) {
    res.clearCookie("admin");
    res.redirect("/");
  }
}

module.exports = new AdminController();
