const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["username", "google"],
    default: "username",
  },
  email: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    enum: ["male", "female"],
    default: "male",
  },
  avatar: {
    type: String,
    maxLength: 255,
  },
});

module.exports = mongoose.model("customer", customerSchema);
