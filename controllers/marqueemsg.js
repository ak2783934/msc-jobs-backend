const MarqueeMsg = require("../models/MarqueeMsg");

exports.postMarqueeMsg = (req, res) => {
  const marqueeMsg = new MarqueeMsg(req.body);
  marqueeMsg.save((err, marqueeMsg) => {
    if (err || !marqueeMsg) {
      return res.status(400).json({ error: "Not able to save msg" });
    }
    return res.send({ marqueeMsg });
  });
};

exports.updateMarqueeMsg = (req, res) => {
  MarqueeMsg.findOneAndUpdate(
    { _id: req.body._id },
    { msg: req.body.msg }
  ).exec((err, marqueeMsg) => {
    if (err || !marqueeMsg) {
      return res.status(400).json({ error: "No marquee message updated" });
    }
    return res.send({ marqueeMsg });
  });

  //   return res.send("update marquee msg");
};

exports.getMarqueeMsg = (req, res) => {
  MarqueeMsg.find({}).exec((err, marqueeMsgs) => {
    if (err || !marqueeMsgs) {
      return res.status(400).json({ error: "No marquee message found" });
    }
    return res.send(marqueeMsgs[0]);
  });
};
