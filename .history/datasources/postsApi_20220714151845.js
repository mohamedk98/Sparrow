const Post = require("../models/Posts");

class PostsApi {
  async getPost(postId) {
    const foundPost = await Post.findOne({ postId: postId });
    if (!foundPost) {
      const error = new Error("Post not found");
      error.httpStatusCode = 404;
      return error;
    }
    return foundPost
  }
}

/posts/385yvudhfldajavvj