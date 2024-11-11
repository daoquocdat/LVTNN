const mongoose = require("mongoose");

exports.handleError = (error, req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(error.errors).map((err) => err.message);
    return res.status(400).json({ errors });
  }
  // Xử lý duplicate key error
  if (error.code === 11000) {
    const duplicatedField = Object.keys(error.keyValue)[0];
    const duplicatedValue = error.keyValue[duplicatedField];
    return res.status(409).json({
      message: `Giá trị '${duplicatedValue}' cho trường '${duplicatedField}' đã tồn tại.`,
    });
  }
  console.log("handleError: ", error);
  // Nếu không phải lỗi ValidationError, chuyển tiếp lỗi
  res.status(500).json({ message: "Đã xảy ra lỗi hệ thống" });
};
