var mongoose = require("mongoose");

const UploadResumeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlenght: 32,
      trim: true,
    },
    contactNo: {
      type: String,
      required: true,
      maxlenght: 10,
      trim: true,
    },
    emailId: {
      type: String,
      trim: true,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UploadResume", UploadResumeSchema);
