const express = require("express");
const router = express.Router();
const { uploadFile } = require("../Util/upload");
const {
  postUploadResume,
  getAllUploadResumes,
  deleteUploadResume,
} = require("../controllers/uploadresume");

const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.post(
  "/uploadresume/create",
  uploadFile.single("resume"),
  postUploadResume
);
router.get(
  "/uploadresume/getall/:userId",
  isSignedIn,
  isAuthenticated,
  getAllUploadResumes
);
router.delete(
  "/uploadresume/delete/:userId/:uploadResumeId",
  isSignedIn,
  isAuthenticated,
  deleteUploadResume
);

module.exports = router;
