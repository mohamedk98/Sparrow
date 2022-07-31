const userApi = require("../models/User");
const postApi = require("../models/Posts");
const sharedPostApi = require("../models/SharedPost");
const AWS = require("aws-sdk");
AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWSACCESSKEY,
    secretAccessKey: process.env.AWSSECRETKEY,
    region: "eu-central-1",
  },
});
const s3 = new AWS.S3();

class UserApi {
  async getUserProfile(userId) {
    const userData = await userApi
      .findById(userId, "-password")
      .populate("friends.data.userId", "firstName lastName profileImage _id");


    if (!userData) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }

    return userData
  }

  async getUserPosts (userId) {
    
    //get user created posts
    const userPosts = await postApi
      .find({ userId })
      .populate({
        path: "comments.userId",
        select: "firstName lastName profileImage _id",
      })
      .populate({
        path: "comments.reply.userId",
        select: "firstName lastName profileImage _id",
      })
      .populate({
        path: "reactions.userId",
        select: "firstName lastName",
      })
      .populate("userId", "firstName lastName _id profileImage");

    //get users shared post
    const userSharedPosts = await sharedPostApi
      .find({ sharerId: userId })
      .populate({
        path: "originalPostId",
        populate: {
          path: "comments.userId",
          select: "firstName lastName profileImage _id",
        },
      })
      .populate({
        path: "originalPostId",
        populate: {
          path: "userId",
          select: "firstName lastName _id profileImage",
        },
      })
      .populate({
        path: "originalPostId",
        populate: {
          path: "reactions.userId",
          select: "firstName lastName",
        },
      })
      .populate({
        path: "originalPostId",
        populate: {
          path: "comments.reply.userId",
          select: "firstName lastName profileImage _id",
        },
      })
      .populate("sharerId", "firstName lastName profileImage _id")
      .populate("reactions.userId", "firstName lastName")
      .populate({
        path: "comments.userId",
        select: "firstName lastName",
      })
      .populate({
        path: "comments.reply.userId",
        select: "firstName lastName profileImage _id",
      });

      return {userPosts,userSharedPosts}
  }
  async getNewsfeed(userId) {
    const userdata = await userApi.findOne({ _id: userId }, "-password");
    let userFriendsIds = userdata.friends.data.map((user) => {
      return user.userId.toString();
    });

    const friendsPosts = await postApi
      .find()
      .where("userId")
      .in(userFriendsIds)
      .populate({
        path: "comments.userId",
        select: "firstName lastName profileImage _id",
      })
      .populate({
        path: "comments.reply.userId",
        select: "firstName lastName profileImage _id",
      })
      .populate({
        path: "reactions.userId",
        select: "firstName lastName",
      })
      .populate("userId", "firstName lastName _id profileImage");

    const friendsSharedPosts = await sharedPostApi
      .find()
      .where("sharerId")
      .in(userFriendsIds)
      .populate({
        path: "originalPostId",
        populate: {
          path: "comments.userId",
          select: "firstName lastName profileImage _id",
        },
      })
      .populate({
        path: "originalPostId",
        populate: {
          path: "userId",
          select: "firstName lastName _id profileImage",
        },
      })
      .populate({
        path: "originalPostId",
        populate: {
          path: "reactions.userId",
          select: "firstName lastName",
        },
      })
      .populate({
        path: "originalPostId",
        populate: {
          path: "comments.reply.userId",
          select: "firstName lastName profileImage _id",
        },
      })
      .populate("sharerId", "firstName lastName profileImage _id")
      .populate("reactions.userId", "firstName lastName")
      .populate({
        path: "comments.userId",
        select: "firstName lastName",
      })
      .populate({
        path: "comments.reply.userId",
        select: "firstName lastName profileImage _id",
      });

    //merge the friends posts and friends shared posts together in one array
    let sharedPosts = friendsPosts.concat(friendsSharedPosts);
    //sort the array descendigly
    sharedPosts = sharedPosts.sort((firstElement, secondElement) => {
      const firstPostDate = new Date(firstElement.createdAt);
      const secondPostDate = new Date(secondElement.createdAt);

      return secondPostDate - firstPostDate;
    });
    return sharedPosts;
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
      createdAt: shareDate,
    });

    const userData = await userApi.findById(sharerId);
    userData.sharedPosts.push({ postId: originalPostId });
    userData.sharesCount = userData.sharesCount + 1;

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
    //get the image to delete
    let currentCoverImage = userData.coverImage.split("/")[4];
    userData.coverImage = coverImageUrl;
    userData.gallery.push(coverImageUrl);
    try {
      let newProfile = await userData.save();
      await s3
        .deleteObject({
          Bucket: "zombie-hat",
          Key: `cover_images/${currentCoverImage}`,
        })
        .promise();
      return {
        newProfile,
        httpStatusCode: 200,
      };
    } catch {
      const error = new Error("something went wrong, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async profileImageUpload(userId, profileImageUrl, profileImageDescription) {
    let userData = await userApi.findById(userId);
    //get the image to delete
    let currentProfileImage = userData.profileImage.split("/")[4];
    userData.profileImage = profileImageUrl;
    //update userData description
    userData.profileImageDescription = profileImageDescription;
    //add new photo to gallery
    userData.gallery.push(profileImageUrl);

    try {
      await s3
        .deleteObject({
          Bucket: "zombie-hat",
          Key: `profile_images/${currentProfileImage}`,
        })
        .promise();
      let newProfile = await userData.save();
      return {
        newProfile,
        httpStatusCode: 200,
      };
    } catch (error) {
      // const error = new Error("something went wrong, please try again later");
      // error.httpStatusCode = 400;
      return error;
    }
  }

  async sendFriendRequest(senderId, receiverId) {
    const receiverData = await userApi.findById(receiverId);

    //if there is no receiver data
    if (!receiverData) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }

    //find if the friend request already exist
    const receiverRequestExist = receiverData.friendsRequests.find(
      (friendRequest) => friendRequest.userId.toString() === senderId
    );

    if (receiverRequestExist) {
      const error = new Error("Friend Request is already a sent");
      error.httpStatusCode = 400;
      return error;
    }

    receiverData.friendsRequests.push({ senderId });

    try {
      await receiverData.save();
      return {
        message: "Friend Request Sent",
        httpStatusCode: 200,
      };
    } catch {
      const error = new Error("something went wrong, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async acceptFriendRequest(userId, friendRequestId) {
    const userData = await userApi.findById(userId);

    //if user is not found
    if (!userData) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }

    const friendExist = userData.friends.find(
      (friendRequest) => friendRequest.userId.toString() === friendRequestId
    );
    //if friend already exist
    if (friendExist) {
      const error = new Error("User is already a friend");
      error.httpStatusCode = 400;
      return error;
    }

    //add the friend to the friends list and remove it from friend request
    userData.friends.push({ friendRequestId });
    userData.friendsRequests = userData.friendsRequests.filter(
      (friendRequest) => friendRequest.userId.toString() !== friendRequestId
    );

    try {
      await userData.save();
      return {
        message: "Friend Request Accepted, you are now friends",
        httpStatusCode: 200,
      };
    } catch {
      const error = new Error("something went wrong, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async removeFriendRequest(userId, friendRequestId) {
    const userData = await userApi.findById(userId);

    //if user is not found
    if (!userData) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }

    const friendRequestExist = userData.friendsRequests.find(
      (friendRequest) => friendRequest.userId.toString() === friendRequestId
    );
    //if friend request doesn't exist
    if (!friendRequestExist) {
      const error = new Error("Friend request already removed");
      error.httpStatusCode = 400;
      return error;
    }

    //add the friend to the friends list and remove it from friend request

    userData.friendsRequests = userData.friendsRequests.filter(
      (friendRequest) => friendRequest.userId.toString() !== friendRequestId
    );

    try {
      await userData.save();
      return {
        message: "Friend Request Removed",
        httpStatusCode: 200,
      };
    } catch {
      const error = new Error("something went wrong, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async removeFriend(userId, friendId) {
    const userData = await userApi.findById(userId);
    const friendExist = userData.friends.find(
      (friend) => friend.userId.toString() === friendId
    );
    //if friend already exist
    if (!friendExist) {
      const error = new Error("Friend already removed");
      error.httpStatusCode = 400;
      return error;
    }

    userData.friends = userData.friends.filter(
      (friend) => friend.userId.toString() !== friendId
    );

    try {
      await userData.save();
      return {
        message: "Friend Removed",
        httpStatusCode: 200,
      };
    } catch {
      const error = new Error("something went wrong, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async blockFriend(userId, friendId) {
    const userData = await userApi.findById(userId);
    if (!userData) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }
    const friendExist = userData.friends.find(
      (friend) => friend.userId.toString() === friendId
    );
    if (!friendExist) {
      const error = new Error("Friend already Blocked");
      error.httpStatusCode = 400;
      return error;
    }

    //remove from friend and add it to block list
    userData.friends = userData.friends.filter(
      (friend) => friend.userId.toString() !== friendId
    );
    userData.blockList.push({ userId: friendId });

    try {
      await userData.save();
      return {
        message: "Friend Blocked",
        httpStatusCode: 200,
      };
    } catch {
      const error = new Error("something went wrong, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async unblockFriend(userId, friendId) {
    const userData = await userApi.findById(userId);
    if (!userData) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }
    const friendBlockExist = userData.blockList.find(
      (blockedUser) => blockedUser.userId.toString() === friendId
    );
    if (!friendBlockExist) {
      const error = new Error("Friend already Removed from block");
      error.httpStatusCode = 400;
      return error;
    }

    //remove from friend and add it to block list
    userData.blockList = userData.blockList.filter(
      (user) => user.userId.toString() !== friendId
    );

    try {
      await userData.save();
      return {
        message: "Friend Unblocked",
        httpStatusCode: 200,
      };
    } catch {
      const error = new Error("something went wrong, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async getFriends(userId) {
    const userFriends = await userApi
      .findById(userId, "friends")
      .populate("friends.userId", "firstName lastName profileImage _id");
    if (!userData) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }
    return { data: userFriends, httpStatusCode: 200 };
  }

  async getFriendsRequests(userId) {
    const userFriendsRequests = await userApi
      .findById(userId, "friendsRequests")
      .populate(
        "friendsRequests.userId",
        "firstName lastName profileImage _id"
      );
    if (!userData) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }
    return { data: userFriendsRequests, httpStatusCode: 200 };
  }

  async search(keyword) {
    try {
      const searchResult = await userApi.find(
        { $text: { $search: keyword } },
        "-password",
        { score: { $meta: "textScore" } }
      );
      console.log();
      return searchResult;
    } catch {
      const error = new Error("something went wrong, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async updateIntro(userId, intro) {
    const userData = await userApi.findById(userId);
    if (!userData) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }
    userData.intro = intro;
    try {
      userData.markModified("intro");
      const updatedUserData = await userData.save();
      return updatedUserData;
    } catch {
      const error = new Error("Something went wrong,Please try again later");
      return error;
    }
  }

  async updateAbout(
    userId,
    { major, university, town, mobile, relationship, work }
  ) {
    const userData = await userApi.findById(userId);
    if (!userData) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }
    userData.major = major;
    userData.university = university;
    userData.town = town;
    userData.mobile = mobile;
    userData.relationship = relationship;
    userData.work = work;
    try {
      const updatedUserData = await userData.save();
      return updatedUserData;
    } catch {
      const error = new Error("Something went wrong,Please try again later");
      return error;
    }
  }
}

module.exports = UserApi;
