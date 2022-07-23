const userApi = require("../models/User");
const postApi = require("../models/Posts");
const sharedPostApi = require("../models/SharedPost");

class UserApi {
  async getUserProfile(userId) {
    const userData = await userApi.findOne({ _id: userId }, "-password");
    if (!userData) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }

    return userData;
  }

  async getNewsfeed(userId) {
    const userdata = await userApi.findOne({ _id: userId }, "-password");
    let userFriendsIds = userdata.friends.data.map((user) => {
      return user.userId.toString();
    });

    const friendsPosts = await postApi
      .find()
      .where("userId")
      .in(userFriendsIds);

    const friendsSharedPosts = await sharedPostApi
      .find()
      .where("sharerId")
      .in(userFriendsIds)
      .populate("originalPostId")
      .populate("sharerId", "firstName lastName profileImage _id");

    // //merge the friends posts and friends shared posts together in one array
    // let sharedPosts = friendsPosts.concat(FriendsSharedPosts);
    // //sort the array descendigly
    // sharedPosts = sharedPosts.sort((firstElement, secondElement) => {
    //   const firstPostDate = new Date(firstElement.createdAt);
    //   const secondPostDate = new Date(secondElement.createdAt);

    //   return secondPostDate - firstPostDate;
    // });
    return friendsSharedPosts;
  }

  async sharePost({
    originalPostId,
    sharerId,
    caption,
    visiability,
    shareDate,
  }) {
    const sharedPost = new sharedPostApi({
      originalPostId,
      sharerId,
      caption,
      visiability,
      shareDate,
    });

    const userData = await userApi.findById(sharerId);
    userData.sharedPosts.push({ postId: originalPostId });

    try {
      await sharedPost.save();
      await userData.save();
      return { message: "Post Shared Successfully", httpStatusCode: 200 };
    } catch {
      const error = new Error("something went wrong, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async coverImageUpload(userId, coverImageUrl) {
    let userData = await userApi.findById(userId);
    userData.coverImage = coverImageUrl;
    try {
      await userData.save();
      return {
        message: "Cover Image Updated Successfully",
        httpStatusCode: 200,
      };
    } catch {
      const error = new Error("something went wrong, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async profileImageUpload(userId, profileImageUrl) {
    let userData = await userApi.findById(userId);
    userData.profileImage = profileImageUrl;
    try {
      await userData.save();
      return {
        message: "Profile Image Updated Successfully",
        httpStatusCode: 200,
      };
    } catch {
      const error = new Error("something went wrong, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }
}

module.exports = UserApi;
