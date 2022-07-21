const userApi = require("../models/User");
const postApi = require("../models/Posts");

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
    let userFriendsIds = [];
    userdata.friends.data.map((user) =>
      userFriendsIds.push(user.userId.toString())
    );
    const friendsPosts = await postApi
      .find()
      .where("userId")
      .in(userFriendsIds);

    const friendsSharedPosts = await userApi
      .findOne({ _id: userId }, "friends -_id")
      .populate({
        path: "friends.data.userId",
        select: "sharedPosts -_id",
        populate: { path: "sharedPosts" },
      }).exec()
      console.log(friendsSharedPosts.friends.data)
    return friendsSharedPosts;
  }
}

module.exports = UserApi;
