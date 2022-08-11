const userApi = require("../models/User");
const postApi = require("../models/Posts");
const sharedPostApi = require("../models/SharedPost");
const notificationApi = require("../models/Notification");
const bycrypt = require("bcrypt");
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
  async getUserProfile(authenticatedUsername, username) {
    let userData = await userApi
      .findOne({ username }, "-password")
      .populate(
        "friends.data.userId",
        "firstName lastName profileImage _id username"
      )
      .populate("blockList.userId", "firstName lastName profileImage _id")
      .lean();

    if (!userData) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }

    if (authenticatedUsername === username) {
      userData.currentLoginAccount = true;
      return userData;
    } else {
      userData.currentLoginAccount = false;
      return userData;
    }
  }

  async getSingleUserProfile(userId) {
    let currentNotifications = await notificationApi
      .find({}, "_id")
      .where("to.userId")
      .in(userId);
    currentNotifications = currentNotifications.map((notification) => {
      return { notificationId: notification._id };
    });
    const userData = userApi
      .findByIdAndUpdate(
        userId,
        { notifcations: currentNotifications },
        { new: true }
      )
      .then((updatedDocument) => {
        return updatedDocument.populate([
          {
            path: "friends.data.userId",
            select: "firstName lastName profileImage _id username",
          },
          {
            path: "notifcations.notificationId",
            select: "_id from message type",
            populate: {
              path: "from",
              select: "_id username firstName lastName profileImage",
            },
          },
        ]);
      });

    if (!userData) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }

    return userData;
  }

  async getUserPosts(userId) {
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
      .limit(1)
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

    let allPosts = userSharedPosts.concat(userPosts);
    //sort the array descendigly
    allPosts = allPosts.sort((firstElement, secondElement) => {
      const firstPostDate = new Date(firstElement.createdAt);
      const secondPostDate = new Date(secondElement.createdAt);

      return secondPostDate - firstPostDate;
    });

    return allPosts;
  }
  async getNewsfeed(userId, page) {
    const limit = 5;
    let skip = page * limit;
    if (page === 1) {
      skip = 1;
    }

    const userdata = await userApi.findOne({ _id: userId }, "-password");
    let userFriendsIds = userdata.friends.data.map((user) => {
      return user.userId.toString();
    });

    const friendsPosts = await postApi
      .find({visiability:"public"})
      .where("userId")
      .in(userFriendsIds)
      .limit(limit)
      .skip(skip)
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
      .populate({
        path: "comments.reactions.userId",
        select: "firstName lastName",
      })
      .populate({
        path: "comments.reply.reactions.userId",
        select: "firstName lastName",
      })
      .populate("userId", "firstName lastName _id profileImage");

    const friendsSharedPosts = await sharedPostApi
      .find({visiability:"public"})
      .limit(limit)
      .skip(skip)
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
        select: "firstName lastName profileImage _id",
      })
      .populate({
        path: "comments.reply.userId",
        select: "firstName lastName profileImage _id",
      });

    //merge the friends posts and friends shared posts together in one array
    let allPosts = friendsPosts.concat(friendsSharedPosts);
    //sort the array descendigly
    allPosts = allPosts.sort((firstElement, secondElement) => {
      const firstPostDate = new Date(firstElement.createdAt);
      const secondPostDate = new Date(secondElement.createdAt);

      return secondPostDate - firstPostDate;
    });
    return { allPosts, page: page };
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

    let userData = await userApi.findById(sharerId);
    let userFriendsIds = userData.friends.data.map((user) => {
      return { userId: user.userId.toString() };
    });

    const newNotification = new notificationApi({
      from: sharerId,
      to: userFriendsIds,
      type: "share post",
      message: "has shared a post",
    });
    userData.sharedPosts.push({ postId: originalPostId });
    let originalPost = await postApi.findById(originalPostId);
    originalPost.sharesCount = originalPost.sharesCount + 1;
    try {
      await sharedPost.save();
      await userData.save();
      await originalPost.save();
      await newNotification.save();
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

    try {
      receiverData.friendsRequests.push({ userId: senderId });
      receiverData.markModified("friendsRequests");
      let updatedUserData = await receiverData.save();
      updatedUserData = await updatedUserData.populate([
        {
          path: "friends.data.userId",
          select: "firstName lastName profileImage _id username",
        },
        {
          path: "blockList.userId",
          select: "firstName lastName profileImage _id",
        },
        {
          path: "notifcations.notificationId",
          select: "_id from message type",
          populate: {
            path: "from",
            select: "_id username firstName lastName profileImage",
          },
        },
      ]);
      return updatedUserData;
    } catch {
      const error = new Error("something went wrong, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async acceptFriendRequest(userId, friendRequestId) {
    const userData = await userApi.findById(userId);
    const friendData = await userApi.findById(friendRequestId);

    //if user is not found
    if (!userData) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }

    const friendExist = userData.friends.data.find(
      (friendRequest) => friendRequest.userId.toString() === friendRequestId
    );
    //if friend already exist
    if (friendExist) {
      const error = new Error("User is already a friend");
      error.httpStatusCode = 400;
      return error;
    }

    //add the friend to the friends list and remove it from friend request
    userData.friends.data.push({ userId: friendRequestId });
    friendData.friends.data.push({ userId: userId });
    userData.friendsRequests = userData.friendsRequests.filter(
      (friendRequest) => friendRequest.userId.toString() !== friendRequestId
    );

    try {
      userData.markModified("friends");
      userData.markModified("friendsRequests");
      friendData.markModified("friends");
      await friendData.save();
      let updatedUserData = await userData.save();
      updatedUserData = await updatedUserData.populate([
        {
          path: "friends.data.userId",
          select: "firstName lastName profileImage _id username",
        },
        {
          path: "blockList.userId",
          select: "firstName lastName profileImage _id",
        },
        {
          path: "notifcations.notificationId",
          select: "_id from message type",
          populate: {
            path: "from",
            select: "_id username firstName lastName profileImage",
          },
        },
      ]);
      return updatedUserData;
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
      let updatedUserData = await userData.save();
      updatedUserData = await updatedUserData.populate([
        {
          path: "friends.data.userId",
          select: "firstName lastName profileImage _id username",
        },
        {
          path: "blockList.userId",
          select: "firstName lastName profileImage _id",
        },
        {
          path: "notifcations.notificationId",
          select: "_id from message type",
          populate: {
            path: "from",
            select: "_id username firstName lastName profileImage",
          },
        },
      ]);
      return updatedUserData;
    } catch {
      const error = new Error("something went wrong, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async removeFriend(userId, friendId) {
    let userData = await userApi.findById(userId);
    const friendData = await userApi.findById(friendId);
    const friendExist = userData.friends?.data.find(
      (friend) => friend.userId.toString() === friendId
    );
    //if friend already exist
    if (!friendExist) {
      const error = new Error("Friend already removed");
      error.httpStatusCode = 400;
      return error;
    }

    userData.friends.data = userData.friends?.data.filter(
      (friend) => friend.userId.toString() !== friendId
    );

    friendData.friends.data = friendData.friends?.data.filter(
      (friend) => friend.userId.toString() !== userId
    );

    try {
      await friendData.save();
      let updatedUserData = await userData.save();
      updatedUserData = await updatedUserData.populate([
        {
          path: "friends.data.userId",
          select: "firstName lastName profileImage _id username",
        },
        {
          path: "blockList.userId",
          select: "firstName lastName profileImage _id",
        },
        {
          path: "notifcations.notificationId",
          select: "_id from message type",
          populate: {
            path: "from",
            select: "_id username firstName lastName profileImage",
          },
        },
      ]);
      return updatedUserData;
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
    const friendExist = userData.friends.data.find(
      (friend) => friend.userId.toString() === friendId
    );
    if (!friendExist) {
      const error = new Error("Friend already Blocked");
      error.httpStatusCode = 400;
      return error;
    }

    //remove from friend and add it to block list
    userData.friends.data = userData.friends.data.filter(
      (friend) => friend.userId.toString() !== friendId
    );
    userData.blockList.push({ userId: friendId });

    try {
      let updatedUserData = await userData.save();
      updatedUserData = await updatedUserData.populate([
        {
          path: "friends.data.userId",
          select: "firstName lastName profileImage _id username",
        },
        {
          path: "blockList.userId",
          select: "firstName lastName profileImage _id",
        },
        {
          path: "notifcations.notificationId",
          select: "_id from message type",
          populate: {
            path: "from",
            select: "_id username firstName lastName profileImage",
          },
        },
      ]);
      return updatedUserData;
    } catch (error) {
      // const error = new Error("something went wrong, please try again later");
      // error.httpStatusCode = 400;
      return error;
    }
  }

  async unblockFriend(userId, friendId) {
    let userData = await userApi.findById(userId);
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
      userData.markModified("blockList");
      let updatedUserData = await userData.save();
      updatedUserData = await updatedUserData.populate([
        {
          path: "friends.data.userId",
          select: "firstName lastName profileImage _id username",
        },
        {
          path: "blockList.userId",
          select: "firstName lastName profileImage _id",
        },
        {
          path: "notifcations.notificationId",
          select: "_id from message type",
          populate: {
            path: "from",
            select: "_id username firstName lastName profileImage",
          },
        },
      ]);
      return updatedUserData;
    } catch {
      const error = new Error("something went wrong, please try again later");
      error.httpStatusCode = 400;
      return error;
    }
  }

  async getFriends(userId) {
    const userFriends = await userApi
      .findById(userId, "friends")
      .populate(
        "friends.data.userId",
        "firstName lastName profileImage _id username"
      );
    console.log(userFriends);
    if (!userFriends) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }
    return userFriends;
  }

  async getFriendsRequests(userId) {
    const userFriendsRequests = await userApi
      .findById(userId, "friendsRequests")
      .populate(
        "friendsRequests.userId",
        "firstName lastName profileImage _id"
      );
    if (!userFriendsRequests) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }
    return userFriendsRequests;
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
      let updatedUserData = await userData.save();
      updatedUserData = await updatedUserData.populate([
        {
          path: "friends.data.userId",
          select: "firstName lastName profileImage _id username",
        },
        {
          path: "blockList.userId",
          select: "firstName lastName profileImage _id",
        },
        {
          path: "notifcations.notificationId",
          select: "_id from message type",
          populate: {
            path: "from",
            select: "_id username firstName lastName profileImage",
          },
        },
      ]);
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
      let updatedUserData = await userData.save();
      updatedUserData = await updatedUserData.populate([
        {
          path: "friends.data.userId",
          select: "firstName lastName profileImage _id username",
        },
        {
          path: "blockList.userId",
          select: "firstName lastName profileImage _id",
        },
        {
          path: "notifcations.notificationId",
          select: "_id from message type",
          populate: {
            path: "from",
            select: "_id username firstName lastName profileImage",
          },
        },
      ]);
      return updatedUserData;
    } catch {
      const error = new Error("Something went wrong,Please try again later");
      return error;
    }
  }

  async updateHobbies(userId, hobbies) {
    const userData = await userApi.findById(userId, "-password");

    if (!userData) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }

    try {
      userData.hobbies = hobbies;
      userData.markModified("hobbies");
      let updatedUserData = await userData.save();
      updatedUserData = await updatedUserData.populate([
        {
          path: "friends.data.userId",
          select: "firstName lastName profileImage _id username",
        },
        {
          path: "blockList.userId",
          select: "firstName lastName profileImage _id",
        },
        {
          path: "notifcations.notificationId",
          select: "_id from message type",
          populate: {
            path: "from",
            select: "_id username firstName lastName profileImage",
          },
        },
      ]);
      return updatedUserData;
    } catch {
      const error = new Error("Something went wrong,Please try again later");
      return error;
    }
  }

  async updateCoverPhotoFromMedia(userId, coverPhotoUrl) {
    let userData = await userApi.findById(userId, "coverImage");
    if (!userData) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }

    try {
      userData.coverImage = coverPhotoUrl;
      userData.markModified("coverImage");
      let updatedUserData = await userData.save();
      updatedUserData = await updatedUserData.populate([
        {
          path: "friends.data.userId",
          select: "firstName lastName profileImage _id username",
        },
        {
          path: "blockList.userId",
          select: "firstName lastName profileImage _id",
        },
        {
          path: "notifcations.notificationId",
          select: "_id from message type",
          populate: {
            path: "from",
            select: "_id username firstName lastName profileImage",
          },
        },
      ]);
      return updatedUserData;
    } catch {
      const error = new Error("Something went wrong,Please try again later");
      return error;
    }
  }

  async updateName(userId, firstName, lastName) {
    let userData = await userApi.findById(userId);
    if (!userData) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }

    try {
      userData.firstName = firstName;
      userData.lastName = lastName;
      userData.markModified("firstName");
      userData.markModified("lastName");

      let updatedUserData = await userData.save();
      updatedUserData = await updatedUserData.populate([
        {
          path: "friends.data.userId",
          select: "firstName lastName profileImage _id username",
        },
        {
          path: "blockList.userId",
          select: "firstName lastName profileImage _id",
        },
        {
          path: "notifcations.notificationId",
          select: "_id from message type",
          populate: {
            path: "from",
            select: "_id username firstName lastName profileImage",
          },
        },
      ]);
      return updatedUserData;
    } catch {
      const error = new Error("Something went wrong,Please try again later");
      return error;
    }
  }
  async updatePassword(userId, oldPassword, newPassword) {
    let userData = await userApi.findById(userId);
    if (!userData) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      return error;
    }

    const isPasswordMatch = await bycrypt.compare(
      oldPassword,
      userData.password
    );

    if (!isPasswordMatch) {
      const error = new Error("Incorrect Old password");
      return error;
    }

    try {
      const hashedPassword = await bycrypt.hash(newPassword, 12);
      userData.password = hashedPassword;
      userData.markModified("password");
      let updatedUserData = await userData.save();
      updatedUserData = await updatedUserData.populate([
        {
          path: "friends.data.userId",
          select: "firstName lastName profileImage _id username",
        },
        {
          path: "blockList.userId",
          select: "firstName lastName profileImage _id",
        },
        {
          path: "notifcations.notificationId",
          select: "_id from message type",
          populate: {
            path: "from",
            select: "_id username firstName lastName profileImage",
          },
        },
      ]);
      return updatedUserData;
    } catch {
      const error = new Error("Something went wrong,Please try again later");
      return error;
    }
  }
}

module.exports = UserApi;
