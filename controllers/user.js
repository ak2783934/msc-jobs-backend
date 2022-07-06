const User = require("../models/User.js");
const { sendCustomEmail } = require("../Util/sendEmail");

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
      const userList = [
        {
          email: user.emailId,
          name: user.founder,
        },
      ];
      const subject = "Your account activated";
      const htmlContent = `<html><body><h2>Welcome to MSC Jobs</h2><p>Your account as an Employer at Mscjobs.in is activated, you can login in to https://mscjobs-admin-login.vercel.app/ and create jobs for your company</p><p>Thanks and Regards</p></body></html>`;
      sendCustomEmail(userList, subject, htmlContent);
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
