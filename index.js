require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");

const app = express();
const mongouri = process.env.DATABASE || `mongodb://localhost:27017/mscjobs`;
mongoose
  .connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

let bucket;
mongoose.connection.on("connected", () => {
  var client = mongoose.connections[0].client;
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "newBucket",
  });
});

const PORT = process.env.PORT || 8080;

//middle wares
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const storage = new GridFsStorage({
  url: mongouri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "newBucket",
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({
  storage,
});

app.get("/api/fileinfo/:filename", (req, res) => {
  const file = bucket
    .find({
      filename: req.params.filename,
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      bucket.openDownloadStreamByName(req.params.filename).pipe(res);
    });
});

const UploadResume = require("./models/UploadResume.js");

app.post("/upload", upload.single("resume"), (req, res) => {
  req.body.resume = req.file.originalname;
  const uploadResume = new UploadResume(req.body);
  //console.log(uploadResume);

  uploadResume.save((err, uploadResume) => {
    if (err) {
      console.error(err);
      return res.status(400).json({
        err: "Not able to save user in DB",
      });
    }
    res.json({
      name: uploadResume.name,
      email: uploadResume.emailId,
    });
  });

  // res.status(200).send("File uploaded successfully");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//SEND IN BLUE STUFF
var SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;

var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

app.post("/sendmsg", (req, res) => {
  const msg = {
    to: req.body.to,
    from: req.body.from,
    subject: req.body.subject,
    text: req.body.text,
  };
  console.log(msg);

  sendSmtpEmail = {
    to: [
      {
        email: req.body.to,
        name: "TEST",
      },
    ],
    params: {
      name: "Avinash",
      surname: "Kumar",
    },
    headers: {
      "X-Mailin-custom":
        "accept: application/json" | "content-type: application/json",
    },
    subject: "Send in blue by Avinash Kumar",
    htmlContent:
      "<html><body><h1>This is my first transactional email for aryan</h1></body></html>",
    sender: { name: "Avinash Kumar", email: "ak2783934@gmail.com" },
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("API called successfully. Returned data: ");
      console.log(data);
      res.send(data);
    },
    function (error) {
      console.error(error);
      res.send(error);
    }
  );
});

//my routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const jobRoute = require("./routes/job");
const jobApplicationRoute = require("./routes/jobapplication");
const marqueeMsgRoute = require("./routes/marqueemsg");
const noticeRoute = require("./routes/notice");
const uploadResumeRoute = require("./routes/uploadresume");
const freeJobAlertsRoute = require("./routes/freejobalerts");
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", jobRoute);
app.use("/api", jobApplicationRoute);
app.use("/api", marqueeMsgRoute);
app.use("/api", noticeRoute);
app.use("/api", uploadResumeRoute);
app.use("/api", freeJobAlertsRoute);

app.listen(PORT, () => {
  console.log(`Test app listening on port ${PORT}`);
});
