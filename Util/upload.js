const mongoose = require("mongoose");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");
const mongouri = process.env.DATABASE || `mongodb://localhost:27017/mscjobs`;

let bucket;
mongoose.connection.on("connected", () => {
  var client = mongoose.connections[0].client;
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "newBucket",
  });
});

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

const uploadFile = multer({
  storage,
});

exports.storage = storage;

exports.uploadFile = uploadFile;
