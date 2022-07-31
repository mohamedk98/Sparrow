const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
  firstUserId: { type: String },
  secondUserId: { type: String },
  sender: { type: String },
  message: { type: String },
  timestamp: { type: Date },
});
const RoomSchema = new mongoose.Schema({
  usersIds: {type:[String],required:false},
  messages: [MessageSchema],
});

module.exports = mongoose.model("Room", RoomSchema);
