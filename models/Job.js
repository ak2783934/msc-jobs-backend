var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const JobSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      trim: true,
      required: true,
      length: 32,
    },
    jobRole: {
      type: String,
      trim: true,
      required: true,
      length: 32,
    },
    workExp: {
      type: String,
      trim: true,
      required: true,
      length: 32,
    },
    workLoc: {
      type: String,
      trim: true,
      required: true,
      length: 32,
    },
    jobType1: {
      type: String,
      enum: ["Government job", "Private job"],
    },
    jobType2: {
      type: String,
      required: true,
    },
    lastDateOfApplication: {
      type: String,
      trim: true,
      length: 32,
    },
    noOfOpenings: {
      type: String,
      trim: true,
      required: true,
      length: 32,
    },
    jobDescription: {
      type: String,
      trim: true,
      required: true,
    },
    additionalNotes: {
      type: String,
      trim: true,
    },
    attachments: {
      type: String,
      trim: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
