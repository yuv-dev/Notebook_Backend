const mongoose = require("mongoose");
const constants = require("../utils/constants");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      min: 5,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      min: 8,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    userType: {
      type: String,
      enum: [constants.userType.customer, constants.userType.admin],
      default: constants.userType.customer,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
