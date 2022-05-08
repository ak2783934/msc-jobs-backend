const express = require("express");
const router = express.Router();

const {
  createFreeJobAlerts,
  getAllFreeJobAlerts,
  deleteFreeJobAlert,
} = require("../controllers/freejobalerts");

const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.post("/freejobalert/create", createFreeJobAlerts);

router.get(
  "/freejobalert/getall/:userId",
  isSignedIn,
  isAuthenticated,
  getAllFreeJobAlerts
);

router.delete(
  "/freejobalert/delete/:userId/:freeJobAlertId",
  isSignedIn,
  isAuthenticated,
  deleteFreeJobAlert
);

module.exports = router;
