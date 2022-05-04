var mongoose = require("mongoose");

const MarqueeMsgSchema = mongoose.Schema(
  {
    msg: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MarqueeMsg", MarqueeMsgSchema);
