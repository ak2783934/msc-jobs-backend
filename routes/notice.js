const express = require("express");
const router = express.Router();

const {
  createNotice,
  deleteANotice,
  getAllNotice,
} = require("../controllers/notice");

const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.post(
  "/notice/create/:userId",
  isSignedIn,
  isAuthenticated,
  createNotice
);

router.get("/notice/getall/:userId", isSignedIn, isAuthenticated, getAllNotice);

router.delete(
  "/notice/delete/:userId/:noticeId",
  isSignedIn,
  isAuthenticated,
  deleteANotice
);

module.exports = router;
