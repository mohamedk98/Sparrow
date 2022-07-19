const postsApi = require("../models/Posts");

class CommentsApi {
  async addComment({ postId, userId, commentDate, content }) {
    try {
      const foundPost = await postsApi.findOne({ _id: postId });
      foundPost.comments.push({ userId, commentDate, content });
      await foundPost.save();
      return { message: "comment added" };
    } catch {
      const error = new Error("An Error has occured, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async deleteComment(postId, commentObjectId) {
    try {
      let foundPost = await postsApi.findOne({ _id: postId });

      if (!foundPost) {
        const error = new Error("Post not found")
        error.httpStatusCode = 400
        return error
      }

      const editedComments = foundPost.comments.filter(
        (comment) => comment._id.toString() !== commentObjectId
      );
      foundPost.comments = editedComments;
      await foundPost.save();
      return { message: "Comment Deleted", httpStatusCode: 200 };
    } catch {
        const error = new Error("an error has occured")
        error.httpStatusCode = 400
        return error
    }
  }
}

module.exports = CommentsApi;
