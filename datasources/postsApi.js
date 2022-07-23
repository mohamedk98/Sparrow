const Post = require("../models/Posts");

class PostsApi {
  async createPost(postData) {
    const post = new Post({
      userId: postData.userId,
      creatorName: postData.creatorName,
      createdAt: postData.createdAt,
      content: postData.content,
      media: postData.media,
      postType:postData.postType
    });
    try {
      await post.save();
      return { message: "Post Created", httpStatusCode: 200 };
    } catch {
      const error = new Error("An error occured, Please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async getPost(postId) {
    const foundPost = await Post.findOne({ _id: postId }).populate(
      "comments.userId",
      "firstName lastName profileImage userId"
    ).populate("comments.reply.userId","firstName lastName profileImage userId ")

    if (foundPost === null) {
      const error = new Error("Post not found");
      error.httpStatusCode = 404;
      return error;
    } else {
      return foundPost;
    }
  }

  

  async deletePost(postId) {
    return Post.deleteOne({ _id: postId })
      .then(() => {
        return { message: "Post deleted", httpStatusCode: 200 };
      })
      .catch(() => {
        const error = new Error("Error deleteing post, please try again later");
        error.httpStatusCode = 400;
        return error;
      });
  }

  async updatePost({ _id, content, media, visiability }) {
    try {
      await Post.findByIdAndUpdate(
        _id,
        { content: content, media: media, visiability: visiability },
        { new: true }
      );

      return { message: "Post updated", httpStatusCode: 200 };
    } catch (error) {
      // const error = new Error("An Error has occured, please try again later");
      // error.httpStatusCode = 400;
      return error;
    }
  }
}
module.exports = PostsApi;
