const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
  sender: { type: String },
  receiver:{type:String},
  message: { type: String },
  timestamp: Date,
});
const RoomSchema = new mongoose.Schema({
  usersIds: {type:[String],required:false},
  messages: [MessageSchema],
});

module.exports = mongoose.model("Room", RoomSchema);
