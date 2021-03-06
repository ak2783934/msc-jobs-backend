const Job = require("../models/Job");
const {
  sendJobNotificationToEveryOne,
} = require("../Util/sendJobNotificationToEveryone");

exports.postJob = (req, res) => {
  console.log(req.body);
  console.log(req.file);
  req.body.attachments = req.file?.originalname;
  req.body.user = req.profile;
  const job = new Job(req.body);
  job.save((err, job) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save job in DB",
      });
    }
    sendJobNotificationToEveryOne(job);
    res.json({ job });
  });
};

exports.getAllJobs = (req, res) => {
  console.log(req);

  Job.find().exec((err, jobs) => {
    if (err || !jobs) {
      return res.status(400).json({ error: "No jobs available in DB" });
    }
    res.json({ jobs });
  });
};

exports.getJobById = (req, res) => {
  console.log(req);
  const jobId = req.params.jobId;
  Job.findById(jobId).exec((err, job) => {
    if (err) {
      return res.status(400).json({
        error: "Job not found in DB",
      });
    }
    if (!job) {
      res.json({ error: "no jobs with given id" });
    }
    res.json({ job });
  });
};

exports.getJobByIdPublic = (req, res) => {
  console.log(req);
  const jobId = req.params.jobId;
  Job.findById(jobId).exec((err, job) => {
    if (err) {
      return res.status(400).json({
        error: "Job not found in DB",
      });
    }
    if (!job) {
      res.json({ error: "no jobs with given id" });
    }
    res.json({ job });
  });
};

exports.getAllJobsByUserId = (req, res) => {
  console.log(req);
  const userId = req.params.userId;

  Job.find({ user: userId }).exec((err, jobs) => {
    if (err) {
      return res.status(400).json({
        error: "No Job found",
      });
    }
    res.json(jobs);
  });
};

exports.deleteJob = (req, res) => {
  const jobId = req.params.jobId;
  console.log(jobId);
  Job.findById(jobId).exec((err, job) => {
    if (err || !job) {
      return res.status(400).json({
        error: "Job with given id is not present",
      });
    }
    job.remove((err, deletedJob) => {
      if (err || !deletedJob) {
        return res.status(400).json({
          error: "Couldn't delete the job",
        });
      }
      res.json({ message: "Job deleted", deletedJob });
    });
  });
};

exports.updateJob = (req, res) => {
  console.log("update job");
  res.send("update job");
};

exports.searchJob = (req, res) => {
  let param = req.query.searchVal;
  console.log(param);
  Job.find({ $text: { $search: param } })
    .limit(10)
    .exec((err, jobs) => {
      if (err) {
        return res.status(400).json({
          error: "No Job found",
        });
      }
      res.json(jobs);
    });
};
