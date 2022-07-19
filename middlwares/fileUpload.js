const multer = require("multer");
const crypto = require("crypto");

//multer images handling function
const imagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `uploads/posts_media`);
  },
  filename: function (req, file, cb) {
    const uniqueFileName = crypto.randomBytes(16).toString("hex");
    cb(null, uniqueFileName + "-" + file.originalname);
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

module.exports = { imagesUpload };
