const FreeJobAlerts = require("../models/FreeJobAlert");

exports.createFreeJobAlerts = (req, res) => {
  const freeJobAlert = new FreeJobAlerts(req.body);
  freeJobAlert.save((err, freeJobAlert) => {
    if (err || !freeJobAlert) {
      return res.status(400).json({ error: "No free job alert found" });
    }
    res.json({ freeJobAlert });
  });
};

exports.getAllFreeJobAlerts = (req, res) => {
  FreeJobAlerts.find().exec((err, freeJobAlerts) => {
    if (err || !freeJobAlerts) {
      return res.status(400).json({
        error: "No free job alerts found",
      });
    }
    res.json({ freeJobAlerts });
  });
};

exports.deleteFreeJobAlert = (req, res) => {
  const freeJobAlertId = req.params.freeJobAlertId;
  console.log(freeJobAlertId);
  FreeJobAlerts.deleteOne({ _id: freeJobAlertId }).exec((err, freeJobAlert) => {
    if (err || !freeJobAlert) {
      return res.json(400).json({
        error: "No free job alerts found with given id",
      });
    }
    res.json({ freeJobAlert });
  });
};
