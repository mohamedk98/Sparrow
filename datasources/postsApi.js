const Post = require("../models/Posts");
const sharedPostAPi = require("../models/SharedPost");
const notificationApi = require("../models/Notification");
const userApi = require("../models/User");
const AWS = require("aws-sdk");
const { default: mongoose } = require("mongoose");
AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWSACCESSKEY,
    secretAccessKey: process.env.AWSSECRETKEY,
    region: "eu-central-1",
  },
});
const s3 = new AWS.S3();

class PostsApi {
  async createPost(postData) {
    const post = new Post({
      userId: postData.userId,
      creatorName: postData.creatorName,
      createdAt: postData.createdAt,
      content: postData.content,
      media: postData.media,
      postType: postData.postType,
      sharesCount: 0,
    });

    const userData = await userApi.findById(postData.userId);
    let userFriendsIds = userData.friends.data.map((user) => {
      return { userId: user.userId.toString() };
    });
    const newNotification = new notificationApi({
      from: sharerId,
      to: userFriendsIds,
      type: "create post",
      message: "has added a new post",
    });
    try {
      await post.save();
      await newNotification.save();
      return { message: "Post Created", httpStatusCode: 200 };
    } catch {
      const error = new Error("An error occured, Please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async getPost(postId) {
    const foundPost = await Post.findOne({ _id: postId })
      .populate("comments.userId", "firstName lastName profileImage userId")
      .populate(
        "comments.reply.userId",
        "firstName lastName profileImage userId "
      );

    if (foundPost === null) {
      const error = new Error("Post not found");
      error.httpStatusCode = 404;
      return error;
    } else {
      return foundPost;
    }
  }

  async deletePost(postId) {
    Post.findByIdAndDelete(postId, async (error, deletedPost) => {
      if (error) {
        return error;
      }
      await sharedPostAPi
        .deleteMany()
        .where("originalId")
        .equals(deletedPost._id);
      if (deletedPost.media.length > 0) {
        const mediaToBeDeleted = deletedPost.media.map((singleImage) => {
          return { Key: `posts_media/${singleImage.split("/")[4]}` };
        });
        console.log(mediaToBeDeleted[0].Key);
        await s3
          .deleteObjects({
            Bucket: "zombie-hat",
            Delete: {
              Objects: mediaToBeDeleted,
            },
          })
          .promise();
      }
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
