
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  userId: { type: String, required: true },
  creatorName: { type: String, required: true },
  createdAt: { type: String, required: true },
  content: { type: String, required: true },
  media: [],
  reactions: [],
  comments: [
    {
      name: String,
      userId: String,
      profileImageUrl:String,
      commentDate:String,
      content: String,
      reply: [
        {
          name: String,
          userId: String,
          commentContent: String,
        },
      ],
      reactions: [],
      date: String,
      visiability: String,
    },
  ],
});
