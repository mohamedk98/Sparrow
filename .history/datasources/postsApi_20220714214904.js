const Post = require("../models/Posts");

class PostsApi {
  async createPost(postData) {
    const post = new Post({
      postId: postData.postId,
      userId: postData.userId,
      creatorName: postData.creatorName,
      createdAt: postData.createdAt,
      content: postData.content,
      media: postData.media,
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
    const foundPost = await Post.findOne({ postId: postId });
    console.log(foundPost);
    if (foundPost === null) {
      const error = new Error("Post not found");
      error.httpStatusCode = 404;
      return error;
    } else {
      return foundPost;
    }
  }

  async deletePost(postId) {
    return Post.deleteOne({ postId: postId })
      .then(() => {
        return { message: "Post deleted", httpStatusCode: 200 };
      })
      .catch(() => {
        const error = new Error("Error deleteing post, please try again later");
        error.httpStatusCode = 400;
        return error;
      });
  }

  async updatePost(newPostData) {}
}
module.exports = new PostsApi();
