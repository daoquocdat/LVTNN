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

  async create(req, res, next) {
    const { name, username, phone, sex, identity } = req.body;
    let { password } = req.body;
    console.log(req?.file?.avatar, "req?.file?.avatar");
    const avatar = req?.file ? req.file.filename : "avatar-staff-default.jpg";

    // Tạo hash cho password
    const salt = bcrypt.genSaltSync(10);
    // Tạo instance mới của staffModel
    const staff = new staffModel({
      name,
      username,
      password: password ? await bcrypt.hash(password, salt) : password,
      phone,
      sex,
      identity,
      avatar,
      status: "active",
    });
    // Lưu staff, nếu không hợp lệ sẽ vào catch
    await staff
      .save()
      .then(() => {
        res.redirect("/admin/staff/index?message=đã tạo nhân viên thành công");
      })
      .catch((error) => {
        console.log(error, "Error creating staff");
        validateErrorHandler("staff/create.hbs", error, req, res);
      });
  }

  async update(req, res) {
    const { name, phone, sex, identity } = req.body;
    const { password } = req.body ? req.body : null;
    const avatar = req?.file ? req.file.filename : null;

    const status = req.body?.status ? "active" : "inactive";
    const params = {
      name,
      phone,
      sex,
      identity,
      status,
    };
    if (avatar) {
      params.avatar = avatar;
    }
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      params.password = await bcrypt.hash(password, salt);
    }

    staffModel
      .findByIdAndUpdate(req.params.id, params, {
        new: true,
        runValidators: true, // Đảm bảo kiểm tra lại các điều kiện khác
      })
      .then(() => {
        res.redirect(
          "/admin/staff/index?message=Cập nhật thông tin nhân viên thành công!"
        );
      })
      .catch((error) => {
        validateErrorHandler("staff/update.hbs", error, req, res);
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
        console.log(admin, "admin");
        if (admin.status === "inactive" && admin.role !== "admin") {
          res.redirect("/admin/login?message=Tai khoan da bi khoa!");
        }
        // const passwordCompare = await bcrypt.compare(password, admin.password);
        // if (!passwordCompare) {
        //   return res.json("Sai mat khau");
        // }
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

        const accessToken = await generateToken(
          { id: admin._id },
          accessTokenSecret
        );

        res.cookie("adminAccessToken", accessToken, {
          maxAge: 900000,
          httpOnly: true,
        });
        if (admin.role === "admin") {
          res.redirect("/admin");
        } else {
          res.redirect("/staff");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  block(req, res) {
    staffModel
      .findByIdAndUpdate(req.params.id, {
        status: "inactive",
      })
      .then((result) => {
        console.log("block success", result);
        res.redirect("/admin/staff/index");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  unBlock(req, res) {
    staffModel
      .findByIdAndUpdate(req.params.id, {
        status: "active",
      })
      .then((result) => {
        console.log("Unblock success", result);
        res.redirect("/admin/staff/index");
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

  createForm(req, res) {
    res.render("admin/create", {
      layout: "admain",
    });
  }

  updateForm(req, res) {
    staffModel
      .findById(req.params.id)
      .then((staff) => {
        res.render("admin/update", {
          formData: staff,
          layout: "admain",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAll(req, res) {
    console.log("staff");
    staffModel
      .find({})
      .then((staffs) => {
        res.render("staff/index", {
          staffs: multipleMongooseToOject(staffs),
          layout: "admain",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getOne(req, res) {
    staffModel
      .findById(req.params.id)
      .then((staff) => {
        res.json({ data: staff });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = new AdminController();
