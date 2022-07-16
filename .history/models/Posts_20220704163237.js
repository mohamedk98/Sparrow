/**
 * @swagger
 components:
     schemas:
       Book:
         type: object
         required:
           - title
           - author
           - finished
         properties:
           id:
             type: integer
             description: The auto-generated id of the book.
           title:
             type: string
             description: The title of your book.
           author:
             type: string
             description: Who wrote the book?
           finished:
             type: boolean
             description: Have you finished reading it?
           createdAt:
             type: string
             format: date
             description: The date of the record creation.
         example:
            title: The Pragmatic Programmer
            author: Andy Hunt / Dave Thomas
            finished: true
 */


const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  userId: { type: String, required: true },
  creatorName: { type: String, required: true },
  content: { type: String, required: true },
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
