var mongoose = require("mongoose");

const FreeJobAlertSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlenght: 32,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
    },
    jobType: {
      type: String,
      enum: ["Teaching Job", "Non Teaching Job"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FreeJobAlert", FreeJobAlertSchema);
