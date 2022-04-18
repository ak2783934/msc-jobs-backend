var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const JobApplicationSchema = mongoose.Schema(
  {
    nameOfCandidate: {
      type: String,
      required: true,
      length: 32,
      trim: true,
    },
    contactNo: {
      type: String,
      required: true,
      length: 32,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      length: 32,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      length: 32,
      trim: true,
    },
    resume: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Fresh Application",
        "Under Consideration",
        "Rejected",
        "Selected",
      ],
      default: "Fresh Application",
    },
    job: {
      type: ObjectId,
      ref: "Job",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", JobApplicationSchema);
