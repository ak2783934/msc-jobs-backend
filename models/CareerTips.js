var mongoose = require("mongoose");

const CareerTipsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
    },
    contactNo: {
      type: String,
      required: true,
      trim: true,
      maxlength: 12,
    },
    query: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareerTips", CareerTipsSchema);
