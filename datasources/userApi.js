const userApi = require("../models/User");
const postApi = require("../models/Posts");
const PostsApi = require("./postsApi");

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

    //return a big nested list of posts
    const nestedFriendsSharedPosts = await userApi
      .findOne({ _id: userId }, "friends -_id")
      .populate({
        path: "friends.data.userId",
        select: "sharedPosts -_id",
        populate: { path: "sharedPosts.postId" },
      })
      .sort("-createdAt");

    //flat map the nested posts
    let FriendsSharedPosts = nestedFriendsSharedPosts.friends.data.flatMap(
      (post) => post.userId.sharedPosts
    );
    //flat map again to get an array of posts
    FriendsSharedPosts = FriendsSharedPosts.flatMap((post) => post.postId);
    // FriendsSharedPosts = FriendsSharedPosts.map((post) => ({
    //   post,
    //   postType: "shared",
    // }));

    //merge the friends posts and friends shared posts together in one array
    let sharedPosts = friendsPosts.concat(FriendsSharedPosts);
    //sort the array descendigly
    sharedPosts = sharedPosts.sort((firstElement, secondElement) => {
      const firstPostDate = new Date(firstElement.createdAt);
      const secondPostDate = new Date(secondElement.createdAt);

      return secondPostDate - firstPostDate;
    });
    return sharedPosts;
  }
}

module.exports = UserApi;
