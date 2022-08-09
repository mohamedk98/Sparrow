const postApi = require("../models/Posts");
const sharedPostApi = require("../models/SharedPost");

class ReactionApi {
  async addPostReaction(postId, userId, reaction) {
    let postData = await postApi.findById(postId);

    const userReactionIndex = postData.reactions.findIndex(
      (reaction) => reaction.userId.toString() === userId
    );
    // if the reaction is not found, add a new reaction
    if (userReactionIndex === -1) {
      postData.reactions.push({ userId, reaction });
      try {
        await postData.save();
        return { message: "reaction added", httpStatusCode: 200 };
      } catch {
        const error = new Error("An Error has occured, please try again later");
        error.httpStatusCode = 400;
        return error;
      }
    }
    //if reaction was found, and the value changed either update it or leave it as it is
    else if (postData.reactions[userReactionIndex].reaction !== reaction) {
      if (postData.reactions[userReactionIndex].userId.toString() !== userId) {
        const error = new Error("Unauthorised");
        error.httpStatusCode = 403;
        return error;
      }
      postData.reactions[userReactionIndex].reaction = reaction;

      try {
        postData.markModified("reactions");
        await postData.save();
        return { message: "reaction updated", httpStatusCode: 200 };
      } catch {
        const error = new Error("An Error has occured, please try again later");
        error.httpStatusCode = 400;
        return error;
      }
    }
  }

  async removePostReaction(postId, userId) {
    const postData = await postApi.findById(postId);

    const userReactionIndex = postData.reactions.findIndex(
      (reaction) => reaction.userId.toString() === userId
    );

    if (userReactionIndex === -1) {
      const error = new Error("Reaction not Found");
      error.httpStatusCode = 404;
      return error;
    }

    if (postData.reactions[userReactionIndex].userId.toString() !== userId) {
      const error = new Error("Unauthorised");
      error.httpStatusCode = 403;
      return error;
    }

    postData.reactions = postData.reactions.filter(
      (reaction) => reaction.userId.toString() !== userId
    );

    try {
      postData.markModified("reactions");
      await postData.save();
      return { message: "reaction deleted", httpStatusCode: 200 };
    } catch {
      const error = new Error("An Error has occured, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async addSharedPostReaction(sharedPostId, userId, reaction) {
    const postData = await sharedPostApi.findById(sharedPostId);

    const userReactionIndex = postData.reactions?.findIndex(
      (reaction) => reaction.userId.toString() === userId
    );
    console.log(userReactionIndex);

    // if the reaction is not found, add a new reaction
    if (userReactionIndex === -1) {
      postData.reactions.push({ userId, reaction });
      try {
        await postData.save();
        return { message: "reaction added", httpStatusCode: 200 };
      } catch {
        const error = new Error("An Error has occured, please try again later");
        error.httpStatusCode = 400;
        return error;
      }
    }
    //if reaction was found, and the value changed either update it or leave it as it is
    else if (postData.reactions[userReactionIndex].reaction !== reaction) {
      if (postData.reactions[userReactionIndex].userId.toString() !== userId) {
        const error = new Error("Unauthorised");
        error.httpStatusCode = 403;
        return error;
      }
      postData.reactions[userReactionIndex].reaction = reaction;
      try {
        postData.markModified("reactions");
        await postData.save();
        return { message: "reaction updated", httpStatusCode: 200 };
      } catch {
        const error = new Error("An Error has occured, please try again later");
        error.httpStatusCode = 400;
        return error;
      }
    }
  }

  async removeSharedPostReaction(sharedPostId, userId) {
    const postData = await sharedPostApi.findById(sharedPostId);

    const userReactionIndex = postData.reactions.findIndex(
      (reaction) => reaction.userId.toString() === userId
    );

    if (userReactionIndex === -1) {
      const error = new Error("Reaction not Found");
      error.httpStatusCode = 404;
      return error;
    }

    if (postData.reactions[userReactionIndex].userId.toString() !== userId) {
      const error = new Error("Unauthorised");
      error.httpStatusCode = 403;
      return error;
    }

    postData.reactions = postData.reactions.filter(
      (reaction) => reaction.userId.toString() !== userId
    );

    try {
      postData.markModified("reactions");
      await postData.save();
      return { message: "reaction deleted", httpStatusCode: 200 };
    } catch {
      const error = new Error("An Error has occured, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async addCommentReaction(postId, userId, commentId, reaction, postType) {
    let postData;
    if (postType === "post") {
      postData = await postApi.findById(postId);
    } else {
      postData = await sharedPostApi.findById(postId);
    }

    const userCommentIndex = postData.comments?.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (userCommentIndex === -1) {
      const error = new Error("Comment not found");
      error.httpStatusCode = 404;
      return error;
    }

    const userReactionIndex = postData.comments[
      userCommentIndex
    ].reactions.findIndex((reaction) => reaction.userId.toString() === userId);

    // if the reaction is not found, add a new reaction
    if (userReactionIndex === -1) {
      postData.comments[userCommentIndex].reactions.push({ userId, reaction });
      try {
        await postData.save();
        return { message: "reaction added", httpStatusCode: 200 };
      } catch {
        const error = new Error("An Error has occured, please try again later");
        error.httpStatusCode = 400;
        return error;
      }
    }
    //if reaction was found, and the value changed either update it or leave it as it is
    else if (
      postData.comments[userCommentIndex].reactions[userReactionIndex]
        .reaction !== reaction
    ) {
      if (
        postData.comments[userCommentIndex].reactions[
          userReactionIndex
        ].userId.toString() !== userId
      ) {
        const error = new Error("Unauthorised");
        error.httpStatusCode = 403;
        return error;
      }
      postData.comments[userCommentIndex].reactions[
        userReactionIndex
      ].reaction = reaction;
      try {
        postData.markModified("comments");
        await postData.save();
        return { message: "reaction updated", httpStatusCode: 200 };
      } catch {
        const error = new Error("An Error has occured, please try again later");
        error.httpStatusCode = 400;
        return error;
      }
    }
  }

  async removeCommentReaction(postId, userId, commentId, postType) {
    let postData;
    if (postType === "post") {
      postData = await postApi.findById(postId);
    } else {
      postData = await sharedPostApi.findById(postId);
    }

    const userCommentIndex = postData.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (userCommentIndex === -1) {
      const error = new Error("Comment not found");
      error.httpStatusCode = 404;
      return error;
    }

    const userReactionIndex = postData.comments[
      userCommentIndex
    ].reactions.findIndex((reaction) => reaction.userId.toString() === userId);

    if (userReactionIndex === -1) {
      const error = new Error("Reaction not Found");
      error.httpStatusCode = 404;
      return error;
    }

    if (
      postData.comments[userCommentIndex].reactions[
        userReactionIndex
      ].userId.toString() !== userId
    ) {
      const error = new Error("Unauthorised");
      error.httpStatusCode = 403;
      return error;
    }

    postData.comments[userCommentIndex].reactions = postData.comments[
      userCommentIndex
    ].reactions.filter((reaction) => reaction.userId.toString() !== userId);

    try {
      postData.markModified("comments");
      await postData.save();
      return { message: "reaction deleted", httpStatusCode: 200 };
    } catch {
      const error = new Error("An Error has occured, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async addReplyReaction(
    postId,
    userId,
    commentId,
    replyId,
    reaction,
    postType
  ) {
    var postData = {};

    if (postType === "post") {
      postData = await postApi.findById(postId);
    } else {
      postData = await sharedPostApi.findById(postId);
    }

    console.log(postData);

    const userCommentIndex = postData.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    console.log(userCommentIndex);
    if (userCommentIndex === -1) {
      const error = new Error("Comment not found");
      error.httpStatusCode = 404;
      return error;
    }

    // console.log(postData.comments[userCommentIndex]?.reply[replyIndex]?.reactions[userReactionIndex])
    const replyIndex = postData.comments[userCommentIndex].reply.findIndex(
      (reply) => reply._id.toString() === replyId
    );
    console.log(replyIndex);
    if (replyIndex === -1) {
      const error = new Error("Reply not found");
      error.httpStatusCode = 404;
      return error;
    }

    const userReactionIndex = postData.comments[userCommentIndex].reply[
      replyIndex
    ]?.reactions?.findIndex(
      (reaction) => reaction.userId.toString() === userId
    );
    console.log(userReactionIndex);
    // if the reaction is not found, add a new reaction
    if (userReactionIndex === -1) {
      postData.comments[userCommentIndex]?.reply[replyIndex]?.reactions.push({
        userId,
        reaction,
      });

      try {
        await postData.save();
        return { message: "reaction added", httpStatusCode: 200 };
      } catch {
        const error = new Error("An Error has occured, please try again later");
        error.httpStatusCode = 400;
        return error;
      }
    }
    //if reaction was found, and the value changed either update it or leave it as it is
    else if (
      postData.comments[userCommentIndex]?.reply[replyIndex]?.reactions[
        userReactionIndex
      ]?.reaction !== reaction
    ) {
      // if (
      //   postData.comments[userCommentIndex]?.reply[
      //     replyIndex
      //   ]?.userId.toString() !== userId
      // ) {
      //   const error = new Error("Unauthorised");
      //   error.httpStatusCode = 403;
      //   return error;
      // }
      postData.comments[userCommentIndex].reply[replyIndex].reactions[
        userReactionIndex
      ].reaction = reaction;

      try {
        postData.markModified("comments");
        await postData.save();
        return { message: "reaction updated", httpStatusCode: 200 };
      } catch {
        const error = new Error("An Error has occured, please try again later");
        error.httpStatusCode = 400;
        return error;
      }
    }
  }
}

module.exports = ReactionApi;
