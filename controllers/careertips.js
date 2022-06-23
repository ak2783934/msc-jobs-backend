const CareerTips = require("../models/CareerTips");

exports.createCareerTips = (req, res) => {
  const careerTips = new CareerTips(req.body);
  careerTips.save((err, careerTips) => {
    if (err || !careerTips) {
      return res.status(400).json({ error: "No career tips created" });
    }
    res.json({ careerTips });
  });
};

exports.getAllCareerTips = (req, res) => {
  CareerTips.find().exec((err, careerTips) => {
    if (err || !careerTips) {
      return res.status(400).json({
        error: "No career tips present",
      });
    }
    res.json({ careerTips });
  });
};

exports.deleteCareerTips = (req, res) => {
  const careerTipsId = req.params.careerTipsId;
  //   console.log(careerTips);
  CareerTips.deleteOne({ _id: careerTipsId }).exec((err, careerTips) => {
    if (err || !careerTips) {
      return res.status(400).json({
        error: "No career tips of given id deleted",
      });
    }
    res.json({ careerTips });
  });
};
