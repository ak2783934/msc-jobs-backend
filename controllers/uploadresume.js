const UploadResume = require("../models/UploadResume");

exports.postUploadResume = (req, res) => {
  req.body.resume = req.file.originalname;
  const uploadResume = new UploadResume(req.body);
  console.log(uploadResume);
  uploadResume.save((err, uploadResume) => {
    if (err || !uploadResume) {
      return res
        .status(400)
        .json({ error: "Couldn't save upload resume to db" });
    }
    res.json({ uploadResume });
  });
};

exports.getAllUploadResumes = (req, res) => {
  UploadResume.find().exec((err, uploadResume) => {
    if (err || !uploadResume) {
      return res.status(400).json({ error: "No uploadResume available in DB" });
    }
    res.json({ uploadResume });
  });
};

exports.deleteUploadResume = (req, res) => {
  const uploadResumeId = req.params.uploadResumeId;
  UploadResume.deleteOne({ _id: uploadResumeId }).exec((err, uploadResume) => {
    if (err || !uploadResume) {
      return res.status(400).json({
        error: "No uploadResume of given id found",
      });
    }
    res.json({ uploadResume });
  });
};
