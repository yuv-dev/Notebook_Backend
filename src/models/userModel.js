const mongoose = require("mongoose");
const constants = require("../utils/constants");

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: String,
    password: String,
    Date:{
        type:Date,
        immutable: true,
        default: () => Date.now()  
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
