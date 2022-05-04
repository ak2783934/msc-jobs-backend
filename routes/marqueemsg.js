const express = require("express");
const router = express.Router();

const {
  getMarqueeMsg,
  postMarqueeMsg,
  updateMarqueeMsg,
} = require("../controllers/marqueemsg");

const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/marqueemsg", getMarqueeMsg);
router.post("/marqueemsg/:userId", isSignedIn, isAuthenticated, postMarqueeMsg);
router.put(
  "/marqueemsg/:userId",
  isSignedIn,
  isAuthenticated,
  updateMarqueeMsg
);

module.exports = router;
