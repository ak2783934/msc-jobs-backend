const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { uploadFile } = require("../Util/upload");
const {
  postJobApplication,
  getJobApplicationById,
  getAllJobApplicationsForJobId,
  updateJobApplication,
  deleteJobApplication,
} = require("../controllers/jobapplication");

const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.post(
  "/jobapplication/:jobId",
  [
    check(
      "nameOfCandidate",
      "Name of candidate should not be less than 3"
    ).isLength({ min: 3 }),
  ],
  uploadFile.single("resume"),
  postJobApplication
);
router.get(
  "/jobapplication/:jobApplicationId/:userId",
  isSignedIn,
  isAuthenticated,
  getJobApplicationById
);
router.get(
  "/jobapplications/:jobId/:userId",
  isSignedIn,
  isAuthenticated,
  getAllJobApplicationsForJobId
);
router.put(
  "/jobapplication/:jobApplicationId/:userId",
  isSignedIn,
  isAuthenticated,
  updateJobApplication
);
router.delete(
  "/jobapplication/:jobApplicationId/userId",
  isSignedIn,
  isAuthenticated,
  deleteJobApplication
);

module.exports = router;
