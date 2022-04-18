const User = require("../models/user.js");

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
