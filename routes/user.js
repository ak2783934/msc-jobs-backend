const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  validateNewUser,
  getAllUnverifiedUsers,
} = require("../controllers/user");

const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.post(
  "/user/verify/:userId",
  isSignedIn,
  isAuthenticated,
  validateNewUser
);

router.get(
  "/user/getAllUnverified/:userId",
  isSignedIn,
  isAuthenticated,
  getAllUnverifiedUsers
);

module.exports = router;
