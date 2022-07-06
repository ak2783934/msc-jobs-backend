const JobApplication = require("../models/JobApplication");
const Job = require("../models/Job");
const { sendCustomEmail } = require("../Util/sendEmail");

// var SibApiV3Sdk = require("sib-api-v3-sdk");
// var defaultClient = SibApiV3Sdk.ApiClient.instance;

// var apiKey = defaultClient.authentications["api-key"];
// apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;

// var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
// var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

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
      //trigger an email from here. okay.
      const userList = [
        {
          email: jobApplication.emailId,
          name: jobApplication.nameOfCandidate,
        },
      ];
      const htmlContent = `<html><body><p>This email confirms yours application for job Id: ${jobApplication.job._id}</p> <div>Name: ${jobApplication.nameOfCandidate}</div><div>Phone no: ${jobApplication.contactNo}</div> <div>We are glad to have you with us</div><div>Please visit us at <a href="www.mscjobs.in">www.mscjobs.in</a> </div></body></html>`;
      sendCustomEmail(userList, "JOB APPLICATION ACCEPTED", htmlContent);
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
  JobApplication.findOneAndUpdate(
    { _id: req.params.jobApplicationId },
    req.body
  ).exec((err, jobApplication) => {
    if (err || !jobApplication) {
      return res
        .status(400)
        .json({ error: "No job application with given id" });
    }
    return res.send({ jobApplication });
  });
};

exports.deleteJobApplication = (req, res) => {
  console.log(req);
  res.json("deleteJobApplication");
};
