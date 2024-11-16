const mongoose = require("mongoose");

exports.validateErrorHandler = (
  template,
  error,
  req,
  res,
  next,
  layout = null
) => {
  if (error instanceof mongoose.Error.ValidationError) {
    const errors = {};
    Object.keys(error.errors).forEach((field) => {
      errors[field] = error.errors[field].message;
    });
    console.log(errors, "errors validateErrorHandler");
    console.log(req.path.startsWith("admin"));
    console.log(req.originalUrl, "req path");

    return res.render(template, {
      errors: errors,
      formData: req.body,
      formImage: req.file,
      layout: req.originalUrl.startsWith("/admin")
        ? "admain"
        : req.originalUrl.startsWith("/staff")
        ? "staff"
        : "main",
    });
  }

  if (error.code === 11000) {
    const duplicatedField = Object.keys(error.keyValue)[0];
    const duplicatedValue = error.keyValue[duplicatedField];
    return res.render(template, {
      errors: {
        message: `Giá trị '${duplicatedValue}' cho trường '${duplicatedField}' đã tồn tại.`,
      },
      formData: req.body, // Giữ lại dữ liệu đã nhập
      layout: req.originalUrl.startsWith("/admin")
        ? "admain"
        : req.originalUrl.startsWith("/staff")
        ? "staff"
        : "main",
    });
  }

  res.render(template, {
    errors: {
      message: "Đã xảy ra lỗi hệ thống",
    },
    layout:
      layout || req.originalUrl.startsWith("/admin")
        ? "admain"
        : req.originalUrl.startsWith("/staff")
        ? "staff"
        : "main",
  });
};
