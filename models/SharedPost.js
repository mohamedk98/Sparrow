const mongoose = require("mongoose");

const sharedPostSchema = new mongoose.Schema({
  originalPostId: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
    required: false,
  },
  sharerId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  caption: { type: String, required: false },
  shareDate: { type: String, required: true },
  comments: [
    {
      userId: { type: mongoose.Types.ObjectId, ref: "User" },
      commentDate: String,
      content: String,
      reply: [
        {
          userId: { type: mongoose.Types.ObjectId, ref: "User" },
          replyDate: String,
          content: String,
        },
      ],
      reactions: [
        {
          userId: { type: mongoose.Types.ObjectId, ref: "User" },
          reaction: { type: String },
        },
      ],
      date: String,
    },
  ],
  visiability: { type: String, required: false },
});

module.exports = mongoose.model("SharedPost", sharedPostSchema);
