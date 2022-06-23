const express = require("express");
const router = express.Router();
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

const {
  createCareerTips,
  getAllCareerTips,
  deleteCareerTips,
} = require("../controllers/careertips");

router.post("/careertips/create", createCareerTips);
router.get(
  "/careertips/getall/:userId",
  isSignedIn,
  isAuthenticated,
  getAllCareerTips
);
router.delete(
  "/careertips/delete/:userId/:careerTipsId",
  isSignedIn,
  isAuthenticated,
  deleteCareerTips
);

module.exports = router;
