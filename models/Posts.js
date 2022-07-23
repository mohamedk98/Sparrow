const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  creatorName: { type: String, required: true },
  createdAt: { type: String, required: true },
  content: { type: String, required: true },
  postType: { type: String, required: false }, //post feeling shared
  media: [],
  reactions: [],
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
      reactions: [],
      date: String,
    },
  ],
  sharesCount: { type: Number },
  visiability: String,
});

module.exports = mongoose.model("Post", postSchema);
