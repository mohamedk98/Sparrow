const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: false },
  profileImage: { type: String, required: false },
  coverImage: { type: String, required: false },
  userDescription: { type: String, required: false },
  friends: {
    data: [
      {
        userId: String,
        firstName: String,
        lastName: String,
        profileImage: String,
      },
    ],
    required: false,
    visibility: Boolean,
  },
  friendsRequests: [
    {
      userId: String,
      firstName: String,
      lastName: String,
      profileImage: String,
      requestState: String,
    },
  ],
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
