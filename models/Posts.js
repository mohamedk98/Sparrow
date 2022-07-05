/**
 * @swagger
 * components:
 *    schemas:
 *      Post:
 *        type: object
 *        required:
 *          - postId
 *          - userId
 *          - creatorName
 *          - content
 *          - createdAt
 *        properties:
 *          postId:
 *            type: string
 *            description: The auto-generated id of the post.
 *          userId:
 *            type: string
 *            description: ID of the user creating the post.
 *          creatorName:
 *            type: string
 *            description: name of the post creator
 *          content:
 *            type: string
 *            description: content of the post
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date of the post creation.
 *          media:
 *            type: array
 *            description: contains media of the posts if exists.
 *          reactions:
 *            type: array
 *            description: contains reactions on the post.
 *          comments:
 *            type: array
 *            description: contains comments on the posts.
 *              
 *

 */

const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  userId: { type: String, required: true },
  creatorName: { type: String, required: true },
  createdAt: { type: String, required: true },
  date: { type: String, required: true },
  media: [],
  reactions: [],
  comments: [
    {
      name: String,
      userId: String,
      commentContent: String,
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
