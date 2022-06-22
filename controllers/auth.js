const User = require("../models/User");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  // console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const user = new User(req.body);
  // console.log("User inside auth");
  console.log(user);
  user.save((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: error,
      });
    }
    res.status(200).json({
      name: user.nameOfOrg,
      email: user.emailId,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const { emailId, password } = req.body;
  console.log(emailId);
  console.log(password);

  // res.status(400).send("yes");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  User.findOne({ emailId }, (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: "Email Id is not registered!" });
    }
    if (user.isVerified === false) {
      return res.status(404).json({ error: "You are not verified" });
    }
    user.comparePassword(password, function (matchError, isMatch) {
      if (matchError) {
        res.status(404).json({
          error: "Password didn't match",
        });
        return;
      } else if (!isMatch) {
        res.status(404).json({
          error: "Password didn't match",
        });
        return;
      } else {
        //CREATE A TOKEN
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        //PUT THE TOKEN INTO COOKIES
        res.cookie("token", token, { expire: new Date() + 9999 });
        //send response to front-end
        const { _id, nameOfOrg, emailId, role } = user;
        res
          .status(200)
          .json({ token, user: { _id, nameOfOrg, emailId, role } });
        return;
      }
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signed out!",
  });
};

// protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["sha1", "RS256", "HS256"],
  userProperty: "auth",
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  console.log("Bhai isAuthentication me hu");
  console.log(req);
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  console.log(req.profile._id == req.auth._id);
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isEmployer = (req, res, next) => {
  if (req.profile.role === 1) {
    return res.status(200).json({ msg: "You are employer!" });
  } else {
    return res.status(200).json({ error: "You are not an employer!" });
  }
  next();
};

exports.isMasterAdmin = (req, res, next) => {
  if (req.profile.role === 2) {
    return res.status(200).json({ msg: "You are master admin!" });
  } else {
    return res.status(200).json({ error: "You are not a master admin!" });
  }
  next();
};
