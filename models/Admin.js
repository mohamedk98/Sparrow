const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  adminImage: { type: String},
});

module.exports = mongoose.model("Admin", adminSchema);
