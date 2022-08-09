const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  age: { type: String, requried: true },
  gender: { type: String, required: true },
  address: { type: String, required: false },
  profileImage: { type: String, required: false, default: "" },
  coverImage: { type: String, required: false, default: "" },
  intro: { type: String, required: false, default: "Hello" },
  relationship: { type: String, required: false, default: "" },
  mobile: { type: String, required: false, default: "" },
  major: { type: String, required: false, default: "" },
  university: { type: String, required: false, default: "" },
  town: { type: String, required: false, default: "" },
  work: { type: String, required: false, default: "" },
  hobbies: [{ type: String, required: false }],
  notifcations: [
    {
      notificationId: { type: mongoose.Types.ObjectId, ref: "Notification" },
    },
  ],
  friends: {
    data: [
      {
        userId: { type: mongoose.Types.ObjectId, ref: "User" },
      },
    ],
    required: false,
    visibility: Boolean,
  },
  friendsRequests: [
    {
      userId: { type: mongoose.Types.ObjectId, ref: "User" },
    },
  ],
  blockList: [
    {
      userId: { type: mongoose.Types.ObjectId, ref: "User" },
    },
  ],
  hiddenPosts: [{ postId: { type: mongoose.Types.ObjectId, ref: "Post" } }],
  gallery: [String],
  sharedPosts: [{ postId: { type: mongoose.Types.ObjectId, ref: "Post" } }],
  verificationCode: String,
  verified: { type: Boolean, default: false },
  resetPasswordCode: String,
  passwordResetMode: { type: Boolean, default: false },
  currentLoginAccount: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", userSchema);
