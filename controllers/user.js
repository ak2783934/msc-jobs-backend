const User = require("../models/User.js");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    user.password = undefined;
    req.profile = user;
    console.log(user);
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.password = undefined;
  return res.json(req.profile);
};

exports.validateNewUser = (req, res) => {
  const reqId = req.body.reqUserId;

  User.findOneAndUpdate({ _id: reqId }, { isVerified: true }).exec(
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({ error: "No user updated" });
      }
      return res.send({ user });
    }
  );
};

exports.getAllUnverifiedUsers = (req, res) => {
  User.find({ isVerified: false }).exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({ error: "No users unverified" });
    }
    return res.send({ users });
  });
};
