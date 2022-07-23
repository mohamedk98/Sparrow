const multer = require("multer");
const crypto = require("crypto");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
//multer images handling function
// const imagesStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, `uploads/posts_media`);
//   },
//   filename: function (req, file, cb) {
//     const uniqueFileName = crypto.randomBytes(16).toString("hex");
//     cb(null, uniqueFileName + "-" + file.originalname);
//   },
// });

//AWS S3 bucket file storage handler using multerS3 

//bucket configuration
const s3 = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWSACCESSKEY,
    secretAccessKey: process.env.AWSSECRETKEY,
  },
});

//multer sotrage configuration
const imagesStorage = multerS3({
  s3: s3,
  bucket: "zombie-hat",
  key: function (req, file, cb) {
    const uniqueFileName = crypto.randomBytes(16).toString("hex");
    cb(null, "posts_media/" + uniqueFileName + "-" + file.originalname);
  },
});

const coverImagesStorage = multerS3({
  s3: s3,
  bucket: "zombie-hat",
  key: function (req, file, cb) {
    const uniqueFileName = crypto.randomBytes(16).toString("hex");
    cb(null, "cover_images/" + uniqueFileName + "-" + file.originalname);
  },
});

const profileImagesStorage = multerS3({
  s3: s3,
  bucket: "zombie-hat",
  key: function (req, file, cb) {
    const uniqueFileName = crypto.randomBytes(16).toString("hex");
    cb(null, "profile_images/" + uniqueFileName + "-" + file.originalname);
  },
});

//images filter
const imagesFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const imagesUpload = multer({
  storage: imagesStorage,
  fileFilter: imagesFilter,
  limits: { fileSize: 5000000 }, //max file size is 5 megabytes
});

const coverImageUpload =multer({
  storage: coverImagesStorage,
  fileFilter: imagesFilter,
  limits: { fileSize: 5000000 }, //max file size is 5 megabytes
});

const profileImageUpload =multer({
  storage: profileImagesStorage,
  fileFilter: imagesFilter,
  limits: { fileSize: 5000000 }, //max file size is 5 megabytes
});


module.exports = { imagesUpload,coverImageUpload,profileImageUpload };
