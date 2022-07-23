const SharedPost = require("../models/SharedPost");
const userApi = require("../models/User");

class SharedPostApi {
  async getSharedPost(sharedPostId) {
    const sharedPost = await SharedPost.findOne({ _id: sharedPostId })
      .populate("comments.userId", "firstName lastName profileImage userId")
      .populate(
        "comments.reply.userId",
        "firstName lastName profileImage userId "
      );

    if (sharedPost === null) {
      const error = new Error("Shared Post not found");
      error.httpStatusCode = 404;
      return error;
    } else {
      return sharedPost;
    }
  }

  async deleteSharedPost(sharedPostId, userId) {
    return SharedPost.deleteOne({ _id: sharedPostId })
      .then(async () => {
        let userData = await userApi.findById(userId);
        userData.sharedPosts = userData.sharedPosts.filter(
          (post) => post.postId.toString() !== sharedPostId
        );
        try {
          await userData.save();
          return { message: "Post deleted", httpStatusCode: 200 };
        } catch {
          const error = new Error(
            "Error deleteing post, please try again later"
          );
          error.httpStatusCode = 400;
          return error;
        }
      })
      .catch(() => {
        const error = new Error("Error deleteing post, please try again later");
        error.httpStatusCode = 400;
        return error;
      });
  }

  async updateSharedPost({ _id, caption, visiability, userId }) {
    try {
      let sharedPostToBeUpdated = await SharedPost.findById(_id);
      if (sharedPostToBeUpdated.sharerId.toString() !== userId) {
        const error = new Error(
          "You don't have permission to update this shared post"
        );
        error.httpStatusCode = 403;
        return error;
      }
      sharedPostToBeUpdated.caption = caption;
      sharedPostToBeUpdated.visiability = visiability;
      await sharedPostToBeUpdated.save();
      return { message: "Post updated", httpStatusCode: 200 };
    } catch {
      const error = new Error("An Error has occured, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }
}
module.exports = SharedPostApi;
