var mongoose = require("mongoose");

const NoticeSchema = mongoose.Schema(
  {
    msg: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", NoticeSchema);
