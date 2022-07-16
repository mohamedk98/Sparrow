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
    if (!foundPost) {
      const error = new Error("Post not found");
      error.httpStatusCode = 404;
      return error;
    }
    return foundPost;
  }

  async deletePost(postId) {

    /**
     * get post id from params
     * get user id from request
     * postId-->userId   if userId-Post !== userId-request --> error 405 unauthorised
     * if ok --> delete post
     * delete files related to the post
     */
    Post.deleteOne({ postId: postId })
      .then(() => {
        return { message: "Post deleted", httpStatusCode: 200 };
      })
      .catch(() => {
        const error = new Error("Error deleteing post, please try again later");
        error.httpStatusCode = 408;
        return error;
      });
  }

  async updatePost(newPostData) {}
}
module.exports = new PostsApi();
