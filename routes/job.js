const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { uploadFile } = require("../Util/upload");

const {
  postJob,
  getJobById,
  getAllJobsByUserId,
  deleteJob,
  updateJob,
  getAllJobs,
  getJobByIdPublic,
  searchJob,
} = require("../controllers/job");

const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.post(
  "/job/create/:userId",
  [
    check(
      "companyName",
      "Name of company should have at least 3 chars"
    ).isLength({ min: 3 }),
    check("jobRole", "Job role should have at least 3 chars").isLength({
      min: 3,
    }),
  ],
  isSignedIn,
  isAuthenticated,
  uploadFile.single("attachments"),
  postJob
);
router.get("/publicjobs/:jobId", getJobByIdPublic);
router.get("/job/:jobId/:userId", isSignedIn, isAuthenticated, getJobById);
router.get("/jobs", getAllJobs);
router.get("/jobs/:userId", isSignedIn, isAuthenticated, getAllJobsByUserId);
router.delete("/job/:jobId/:userId", isSignedIn, isAuthenticated, deleteJob);
router.put("/job/:jobId", isSignedIn, isAuthenticated, updateJob);
router.get("/jobsearch", searchJob);

module.exports = router;
