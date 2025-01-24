const mongoose = require("mongoose");
const constants = require('../utils/constants');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      enum: [constants.tag.general, constants.tag.urgent, constants.tag.personal, constants.tag.reminder ],
      default: constants.tag.general,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    username:{
      type: String,
      required: true
    },
    date: {
      type: String,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("note", noteSchema);
