const FreeJobAlerts = require("../models/FreeJobAlert");
const { sendCustomEmail } = require("./sendEmail");

exports.sendJobNotificationToEveryOne = (job) => {
  //what we have to do is to send the notification to everyone who are in our free job alert list
  FreeJobAlerts.find().exec((err, freeJobAlerts) => {
    if (err || !freeJobAlerts) {
      console.log("No free alert subscribed");
    }
    const userList = [];
    freeJobAlerts.map((freeJobAlert) => {
      const user = {
        name: freeJobAlert.name,
        email: freeJobAlert.emailId,
      };
      userList.push(user);
    });
    const subject = "NEW JOB AVAILABLE";
    const htmlContent = `<html><body><h2>New job alert</h2><p>Hey job seeker, There is a new opening at mscjobs.in, please visit to this link to know more <a href="https://www.mscjobs.in/jobsearch?searchVal=${job.companyName}">LINK</a></p></body></html>`;
    sendCustomEmail(userList, subject, htmlContent);
  });
};
