var mongoose = require("mongoose");

const FreeJobAlertSchema = mongoose.Schema(
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
    jobType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FreeJobAlert", FreeJobAlertSchema);
