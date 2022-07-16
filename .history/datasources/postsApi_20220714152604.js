const Post = require("../models/Posts");

class PostsApi {
  async getPost(postId) {
    const foundPost = await Post.findOne({ postId: postId });
    if (!foundPost) {
      const error = new Error("Post not found");
      error.httpStatusCode = 404;
      return error;
    }
    return foundPost;
  }

  async deletePost(postId) {
    Post.deleteOne({ postId: postId })
      .then(() => {
        return { message: "Post deleted", httpStatusCode: 200 };
      })
      .catch(() => {
        const error = new Error("Error deleteing post, please try again later");
        error.httpStatusCode = 404;
        return error;
      });
  }
}
