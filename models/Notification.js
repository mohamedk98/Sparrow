const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
  from: { type: mongoose.Types.ObjectId, ref: "User" },
  type: String,
  message: String,
  to: [{ userId: { type: mongoose.Types.ObjectId, ref: "User" } }],
});

module.exports = mongoose.model("Notification", notificationSchema);
