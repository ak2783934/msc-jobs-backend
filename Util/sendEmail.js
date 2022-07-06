var SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;

var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

exports.sendCustomEmail = (userList, subject, emailInHtml) => {
  sendSmtpEmail = {
    to: userList,
    subject: subject,
    htmlContent: emailInHtml,
    sender: { name: "Avinash Kumar", email: "ak2783934@gmail.com" },
  };
  apiInstance
    .sendTransacEmail(sendSmtpEmail)
    .then(
      function (data) {
        console.log("API called successfully. Returned data: ");
        console.log(data);
        console.log("job application created");
      },
      function (error) {
        console.error(error);
      }
    )
    .catch((err) => console.log(err));
};
