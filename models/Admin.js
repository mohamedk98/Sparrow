const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  adminImage: {
    type: String,
    default:
      "https://zombie-hat.s3.eu-central-1.amazonaws.com/defaults/default-profile-image.jpg",
  },
});

module.exports = mongoose.model("Admin", adminSchema);
