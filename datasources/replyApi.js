const postsApi = require("../models/Posts");

class ReplyApi {
  // , userId, replyDate, content
  async addReply({ postId, commentId, userId, replyDate, content }) {
    
    const postToAddReply = await postsApi.findOne({ _id: postId });
    if (!postToAddReply) {
      const error = new Error("Post not Found");
      error.httpStatusCode = 404;
      return error;
    }
    const commentToAddReplyIndex = postToAddReply.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentToAddReplyIndex === -1) {
      const error = new Error("Comment not Found");
      error.httpStatusCode = 404;
      return error;
    }
    // let commentToAddReply = postToAddReply.comments.find(
    //   (comment) => comment._id.toString() === commentId
    // );

    postToAddReply.comments[commentToAddReplyIndex].reply.push({
      userId,
      replyDate,
      content,
    });
    try {
      await postToAddReply.save();
      return { message: "reply added", httpStatusCode: 200 };
    } catch {
      const error = new Error("An error has occured");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async deleteReply() {}
}
module.exports = ReplyApi;
