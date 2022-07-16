const Post = require("../models/Posts");

class PostsApi {
  async createPost(postData) {
    /**
     * postId & userId & content & media & created At --> controller
     */
    //get the user first name and last name
    //concatenate firstname+lastname
    //add post to db

    // const userData = await User.findOne(
    //   { userId: postData.userId },
    //   "firstName lastName"
    // );

    // const creatorName = ` ${userData.firstName} ${userData.lastName}`;

    /**
     * postsMedia (folder)-->postId(folder) --> imgName.png/jpg/gif/jpeg
     */
    const post = new Post({
      postId: postData.postId,
      userId: postData.userId,
      creatorName: postData.creatorName,
      createdAt: postData.createPost,
      content: postData.content,
      media: postData.media,
    });
    try {
      post.save();
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
