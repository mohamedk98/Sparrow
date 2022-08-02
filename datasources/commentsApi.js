const postsApi = require("../models/Posts");
const sharedPostApi = require("../models/SharedPost");

class CommentsApi {
  /**Post Comment API */
  async addComment({ postId, userId, commentDate, content }) {
    let foundPost = await postsApi.findById(postId);
    try {
      foundPost.comments.push({ userId, commentDate, content });
      foundPost.markModified("comments");
      await foundPost.save();
      return { message: "comment added", httpStatusCode: 200 };
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
        const error = new Error("Post not found");
        error.httpStatusCode = 400;
        return error;
      }

      const editedComments = foundPost.comments.filter(
        (comment) => comment._id.toString() !== commentObjectId
      );
      foundPost.comments = editedComments;
      await foundPost.save();
      return { message: "Comment Deleted", httpStatusCode: 200 };
    } catch {
      const error = new Error("an error has occured");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async updateComment({ postId, commentId, userId, content }) {
    const postWithOldComment = await postsApi.findOne({ _id: postId });
    if (!postWithOldComment) {
      const error = new Error("Post not Found");
      error.httpStatusCode = 404;
      return error;
    }
    const commentToBeUpdatedIndex = postWithOldComment.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentToBeUpdatedIndex === -1) {
      const error = new Error("comment not Found");
      error.httpStatusCode = 404;
      return error;
    }

    const commentToBeDeletedUserId =
      postWithOldComment.comments[commentToBeUpdatedIndex].userId;

    if (commentToBeDeletedUserId.toString() !== userId) {
      const error = new Error("Unauthorized");
      error.httpStatusCode = 401;
      return error;
    }
    postWithOldComment.comments[commentToBeUpdatedIndex].content = content;
    try {
      await postWithOldComment.save();
      return { message: "Comment Updated", httpStatusCode: 200 };
    } catch {
      const error = new Error("An error has occured, Please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  /**Shared Post Comment API */
  async addSharedPostComment({ sharedPostId, userId, commentDate, content }) {
    let foundPost = await sharedPostApi.findById(sharedPostId);
    try {
      foundPost.comments.push({ userId, commentDate, content });
      foundPost.markModified("comments");
      await foundPost.save();
      return await foundPost.save();
    } catch {
      const error = new Error("An Error has occured, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async deleteSharedPostComment(sharedPostId, commentObjectId) {
    try {
      let foundPost = await sharedPostApi.findOne({ _id: sharedPostId });

      if (!foundPost) {
        const error = new Error("Post not found");
        error.httpStatusCode = 404;
        return error;
      }

      const editedComments = foundPost.comments.filter(
        (comment) => comment._id.toString() !== commentObjectId
      );
      foundPost.comments = editedComments;
      await foundPost.save();
      return { message: "Comment Deleted", httpStatusCode: 200 };
    } catch {
      const error = new Error("an error has occured");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async updateSharedPostComment({ sharedPostId, commentId, userId, content }) {
    const postWithOldComment = await sharedPostApi.findOne({
      _id: sharedPostId,
    });
    if (!postWithOldComment) {
      const error = new Error("Post not Found");
      error.httpStatusCode = 404;
      return error;
    }
    const commentToBeUpdatedIndex = postWithOldComment.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentToBeUpdatedIndex === -1) {
      const error = new Error("comment not Found");
      error.httpStatusCode = 404;
      return error;
    }

    const commentToBeDeletedUserId =
      postWithOldComment.comments[commentToBeUpdatedIndex].userId;

    if (commentToBeDeletedUserId.toString() !== userId) {
      const error = new Error("Unauthorized");
      error.httpStatusCode = 401;
      return error;
    }
    postWithOldComment.comments[commentToBeUpdatedIndex].content = content;
    try {
      await postWithOldComment.save();
      return { message: "Comment Updated", httpStatusCode: 200 };
    } catch {
      const error = new Error("An error has occured, Please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }
}

module.exports = CommentsApi;
