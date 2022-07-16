const multer = require("multer");
const crypto = require("crypto");

const imagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `/uploads/postsMedia}`);
  },
  filename: function (req, file, cb) {
    const uniqueFileName = crypto.randomBytes(16).toString("hex");
    cb(null, uniqueFileName + "-" + file.originalname);
  },
});

const imagesFilter = (file)=>{
if (file.mimetype === "imag")
}
const imagesUpload = multer({ storage: imagesStorage });
