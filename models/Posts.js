const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref:"User",required: true },
  creatorName: { type: String, required: true },
  createdAt: { type: String, required: true },
  content: { type: String, required: true },
  postType: { type: String, required: false },
  media: [],
  reactions: [
    {
      userId: { type: mongoose.Types.ObjectId, ref: "User" },
      reaction: { type: String },
    },
  ],
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
          reactions: [
            {
              userId: { type: mongoose.Types.ObjectId, ref: "User" },
              reaction: { type: String },
            },
          ]
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
  sharesCount: { type: Number,default:0 },
  visiability: String,
});

module.exports = mongoose.model("Post", postSchema);
