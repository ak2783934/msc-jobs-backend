const Notice = require("../models/Notice");

exports.createNotice = (req, res) => {
  const notice = new Notice(req.body);
  notice.save((err, notice) => {
    if (err || !notice) {
      return res.status(400).json({
        error: "No notice created",
      });
    }
    res.json({ notice });
  });
};

exports.getAllNotice = (req, res) => {
  Notice.find().exec((err, notices) => {
    if (err || !notices) {
      return res.status(400).json({
        error: "No Notice found",
      });
    }
    res.json({ notices });
  });
};

exports.deleteANotice = (req, res) => {
  const noticeId = req.params.noticeId;
  Notice.deleteOne({ _id: noticeId }).exec((err, notice) => {
    if (err || !notice) {
      return res.status(400).json({
        error: "No notice of given id found",
      });
    }
    res.json({ notice });
  });
};
