const JobApplication = require("../models/JobApplication");
const Job = require("../models/Job");

exports.postJobApplication = (req, res) => {
  req.body.resume = req.file.originalname;
  const jobId = req.params.jobId;
  console.log(jobId);
  console.log(req.body);
  //   res.json("bhai post job application");
  Job.findById(jobId).exec((err, job) => {
    if (err || !job) {
      return res.status(400).json({
        error: "No job with given id",
      });
    }
    req.body.job = job;
    const jobApplication = new JobApplication(req.body);
    jobApplication.save((err, jobApplication) => {
      if (err || !jobApplication) {
        return res.status(400).json({ error: "Couldn't save the job" });
      }
      res.json({ jobApplication });
    });
  });
};

exports.getJobApplicationById = (req, res) => {
  const jobApplicationId = req.params.jobApplicationId;
  console.log(jobApplicationId);
  JobApplication.findById(jobApplicationId).exec((err, jobApplication) => {
    if (err || !jobApplication) {
      return res
        .status(400)
        .json({ error: "No job application with given id found" });
    }
    res.json({ jobApplication });
  });
};

exports.getAllJobApplicationsForJobId = (req, res) => {
  console.log(req);
  const jobId = req.params.jobId;

  JobApplication.find({ job: jobId }).exec((err, jobs) => {
    if (err || !jobs) {
      return res.status(400).json({
        error: "No job applications are found under for the given job ID",
      });
    }
    res.json(jobs);
  });
};

exports.updateJobApplication = (req, res) => {
  console.log(req);
  res.json("updateJobApplication");
};

exports.deleteJobApplication = (req, res) => {
  console.log(req);
  res.json("deleteJobApplication");
};
