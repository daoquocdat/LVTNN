const staffModel = require("../../models/staff.model");
const bcrypt = require("bcrypt");
const { multipleMongooseToOject } = require("../../../util/mongoose");
const { validateErrorHandler } = require("../../common/handleError");
class staffController {
  index(req, res) {
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
  async create(req, res, next) {
    const { name, username, phone, sex, identity } = req.body;
    let { password } = req.body;
    console.log(req?.file?.avatar, "req?.file?.avatar");
    const avatar = req?.file ? req.file.filename : "avatar-staff-default.jpg";

    // Kiểm tra các đầu vào để debug nếu cần
    console.log("Received data:", req.body);
    console.log("Received avatar:", avatar);

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
        validateErrorHandler("staff/create.hbs", error, req, res, next);
      });
  }

  async update(req, res) {
    const { name, phone, sex, identity } = req.body;
    const { password } = req.body ? req.body : null;
    console.log(password, "password");
    const avatar = req?.file ? req.file.filename : null;
    const params = {
      name,
      phone,
      sex,
      identity,
      avatar,
    };
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      params.password = await bcrypt.hash(password, salt);
    }
    staffModel.findById((result) => {});
    staffModel
      .findByIdAndUpdate(req.params.id, params)
      .then((result) => {
        console.log(result);
        res.json({ message: "Cập nhật thông tin nhân viên thành công!" });
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

  createForm(req, res) {
    res.render("staff/create", {
      layout: "admain",
    });
  }

  updateForm(req, res) {
    staffModel
      .findById(req.params.id)
      .then((staff) => {
        res.render("staff/update", {
          formData: staff,
          layout: "admain",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = new staffController();
