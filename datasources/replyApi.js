const postsApi = require("../models/Posts");
const sharedPostApi = require("../models/SharedPost");
class ReplyApi {
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

  async deleteReply({ postId, commentId, replyId, userId }) {
    const postToDeleteReply = await postsApi.findOne({ _id: postId });

    if (!postToDeleteReply) {
      const error = new Error("Post not Found");
      error.httpStatusCode = 404;
      return error;
    }
    //get the comment that contain the reply
    const commentToDeleteReplyIndex = postToDeleteReply.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentToDeleteReplyIndex === -1) {
      const error = new Error("Comment not Found");
      error.httpStatusCode = 404;
      return error;
    }

    //get the index of the reply that will be removed
    const replyToDeleteIndex = postToDeleteReply.comments[
      commentToDeleteReplyIndex
    ].reply.findIndex((singleReply) => singleReply._id.toString() === replyId);

    if (replyToDeleteIndex === -1) {
      const error = new Error("Reply not Found");
      error.httpStatusCode = 404;
      return error;
    }

    const replyToDeleteUserId =
      postToDeleteReply.comments[commentToDeleteReplyIndex].reply[
        replyToDeleteIndex
      ]._id.toString();

    //Check if the user is authorized to delete this reply
    // if (userId !== replyToDeleteUserId) {
    //   const error = new Error("Unauthorized");
    //   error.httpStatusCode = 401;
    //   return error;
    // }
    //Remove the reply from the comments and append it to the main post
    postToDeleteReply.comments[commentToDeleteReplyIndex].reply.splice(
      replyToDeleteIndex,
      1
    );

    try {
      await postToDeleteReply.save();
      return { message: "Reply deleted", httpStatusCode: 200 };
    } catch {
      const error = new Error("An error has occured please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async updateReply({ postId, commentId, replyId, userId, content }) {
    const postWithOldReply = await postsApi.findOne({ _id: postId });
    if (!postWithOldReply) {
      const error = new Error("Post not Found");
      error.httpStatusCode = 404;
      return error;
    }
    const commentIndex = postWithOldReply.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      const error = new Error("comment not Found");
      error.httpStatusCode = 404;
      return error;
    }

    const replyToBeDeletedIndex = postWithOldReply.comments[
      commentIndex
    ].reply.findIndex((reply) => reply._id.toString() === replyId);

    if (replyToBeDeletedIndex === -1) {
      const error = new Error("Reply not Found");
      error.httpStatusCode = 404;
      return error;
    }

    const replyToBeDeletedUserId =
      postWithOldReply.comments[commentIndex].reply[
        replyToBeDeletedIndex
      ].userId.toString();

    if (replyToBeDeletedUserId !== userId) {
      const error = new Error("Unauthorized");
      error.httpStatusCode = 401;
      return error;
    }
    postWithOldReply.comments[commentIndex].reply[
      replyToBeDeletedIndex
    ].content = content;
    try {
      await postWithOldReply.save();
      return { message: "Reply Updated", httpStatusCode: 200 };
    } catch {
      const error = new Error("An error has occured, Please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async addSharedPostReply({
    sharedPostId,
    commentId,
    userId,
    replyDate,
    content,
  }) {
    const postToAddReply = await sharedPostApi.findOne({ _id: sharedPostId });
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

  async deleteSharedPostReply( sharedPostId, commentId, replyId, userId ) {
    const postToDeleteReply = await sharedPostApi.findOne({
      _id: sharedPostId,
    });

    if (!postToDeleteReply) {
      const error = new Error("Post not Found");
      error.httpStatusCode = 404;
      return error;
    }
    //get the comment that contain the reply
    const commentToDeleteReplyIndex = postToDeleteReply.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentToDeleteReplyIndex === -1) {
      const error = new Error("Comment not Found");
      error.httpStatusCode = 404;
      return error;
    }

    //get the index of the reply that will be removed
    const replyToDeleteIndex = postToDeleteReply.comments[
      commentToDeleteReplyIndex
    ].reply.findIndex((singleReply) => singleReply._id.toString() === replyId);

    if (replyToDeleteIndex === -1) {
      const error = new Error("Reply not Found");
      error.httpStatusCode = 404;
      return error;
    }

    // const replyToDeleteUserId =
    //   postToDeleteReply.comments[commentToDeleteReplyIndex].reply[
    //     replyToDeleteIndex
    //   ]._id.toString();

    // //Check if the user is authorized to delete this reply
    // if (userId !== replyToDeleteUserId) {
    //   const error = new Error("Unauthorized");
    //   error.httpStatusCode = 403;
    //   return error;
    // }
    //Remove the reply from the comments and append it to the main post
    postToDeleteReply.comments[commentToDeleteReplyIndex].reply.splice(
      replyToDeleteIndex,
      1
    );

    try {
      await postToDeleteReply.save();
      return { message: "Reply deleted", httpStatusCode: 200 };
    } catch {
      const error = new Error("An error has occured please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async updateSharedPostReply({
    sharedPostId,
    commentId,
    replyId,
    userId,
    content,
  }) {
    const postWithOldReply = await sharedPostApi.findOne({ _id: sharedPostId });
    if (!postWithOldReply) {
      const error = new Error("Post not Found");
      error.httpStatusCode = 404;
      return error;
    }
    const commentIndex = postWithOldReply.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      const error = new Error("comment not Found");
      error.httpStatusCode = 404;
      return error;
    }

    const replyToBeDeletedIndex = postWithOldReply.comments[
      commentIndex
    ].reply.findIndex((reply) => reply._id.toString() === replyId);

    if (replyToBeDeletedIndex === -1) {
      const error = new Error("Reply not Found");
      error.httpStatusCode = 404;
      return error;
    }

    const replyToBeDeletedUserId =
      postWithOldReply.comments[commentIndex].reply[
        replyToBeDeletedIndex
      ].userId.toString();

    if (replyToBeDeletedUserId !== userId) {
      const error = new Error("Unauthorized");
      error.httpStatusCode = 401;
      return error;
    }
    postWithOldReply.comments[commentIndex].reply[
      replyToBeDeletedIndex
    ].content = content;
    try {
      await postWithOldReply.save();
      return { message: "Reply Updated", httpStatusCode: 200 };
    } catch {
      const error = new Error("An error has occured, Please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }
}
module.exports = ReplyApi;
