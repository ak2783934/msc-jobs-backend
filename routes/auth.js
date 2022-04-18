var express = require("express");
var router = express.Router();
const { check } = require("express-validator");

const { signup, signin, signout } = require("../controllers/auth.js");

router.post(
  "/signup",
  [
    check("nameOfOrg", "Name of org should be atleast 3 chars").isLength({
      min: 3,
    }),
    check("emailId", "Email is required").isEmail(),
    check("founder", "founder should have at least 3 chars").isLength({
      min: 3,
    }),
    check("contact", "Contact should have 10 chars").isLength(10),
    check("password", "Password should be at least 3 char").isLength({
      min: 5,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("emailId", "Email is required").isEmail(),
    check("password", "Password field is required").isLength({
      min: 3,
    }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
