const express = requier("express");
const router = express.Router();

const {
  createFreeJobAlerts,
  getAllFreeJobAlerts,
  deleteFreeJobAlert,
} = require("../controllers/freejobalerts");

const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.post(
  "/freejobalert/create/:userId",
  isSignedIn,
  isAuthenticated,
  createFreeJobAlerts
);

router.get(
  "/freejobalert/getall/:userId",
  isSignedIn,
  isAuthenticated,
  getAllFreeJobAlerts
);

router.delete(
  "/freejobalert/delete/:userId/:noticeId",
  isSignedIn,
  isAuthenticated,
  deleteFreeJobAlert
);

module.exports = router;
