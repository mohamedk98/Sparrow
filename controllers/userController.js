const UserApi = require("../datasources/userApi");
const userApi = new UserApi();
const SharedPostApi = require("../datasources/sharedPostApi");
const sharedPostApi = new SharedPostApi();
const ReactionApi = require("../datasources/reactionsApi");
const reactionApi = new ReactionApi();
const getProfile = (req, res) => {
  const userId = req.userId;
  userApi
    .getUserProfile(userId)
    .then((response) => res.status(200).send(response))
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};

const getNewsfeed = (req, res) => {
  const userId = req.userId;
  userApi
    .getNewsfeed(userId)
    .then((response) => res.header("Cache-Control", "no-cache").send(response))
    .catch((error) => res.send(error));
};

const sharePost = async (req, res) => {
  const userId = req.userId;
  const caption = req.body.caption;
  const postId = req.params.postId;
  const visiability = req.body.visiability;
  const shareDate = new Date().toISOString();

  const sharedPostData = {
    originalPostId: postId,
    sharerId: userId,
    caption,
    visiability,
    shareDate,
  };

  await userApi
    .sharePost(sharedPostData)
    .then((response) =>
      res.status(response.httpStatusCode).send(response.message)
    )
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};

const deleteSharedPost = async (req, res) => {
  const userId = req.userId;
  const sharedPostId = req.params.sharedPostId;

  const sharedPost = await sharedPostApi.getSharedPost(sharedPostId);
  if (!sharedPost) {
    return res.status(404).send("Shared Post not Found");
  }

  if (sharedPost.sharerId.toString() !== userId) {
    return res
      .status(403)
      .send("You Don't have Permissions to Delete This Post");
  }

  await sharedPostApi
    .deleteSharedPost(sharedPostId, userId)
    .then((response) => {
      res.status(response.httpStatusCode).send(response.message);
    })
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};

const updateSharedPost = async (req, res) => {
  const userId = req.userId;
  const sharedPostId = req.params.sharedPostId;
  const caption = req.body.caption;
  const visiability = req.body.visiability;

  await sharedPostApi
    .updateSharedPost({ sharedPostId, caption, visiability, userId })
    .then((response) => {
      res.status(response.httpStatusCode).send(response.message);
    })
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};

const uploadCoverPhoto = async (req, res) => {
  const coverImage = req.file;
  const userId = req.userId;

  await userApi
    .coverImageUpload(userId, coverImage.location)
    .then((response) => {
      res.status(response.httpStatusCode).send(response);
    })
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};
const uploadProfilePhoto = async (req, res) => {
  const profileImage = req.file;
  const userId = req.userId;
  const profileImageDescription = req.body.profileImageDescription;
  try {
    await userApi
      .profileImageUpload(
        userId,
        profileImage.location,
        profileImageDescription
      )
      .then((response) => {
        res.status(response.httpStatusCode).send(response);
      })
      .catch((error) => res.status(error.httpStatusCode).send(error.message));
  } catch {
    res.status(400).send("AN error has occured,plese try again later");
  }
};

const addPostReaction = async (req, res) => {
  const userId = req.userId;
  const postId = req.params.postId;
  const reaction = req.body.data.reaction;
console.log(req.body)
  await reactionApi
    .addPostReaction(postId, userId, reaction)
    .then((response) =>
      res.status(response.httpStatusCode).send(response.message)
    )
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};

const removePostReaction = async (req, res) => {
  const userId = req.userId;
  const postId = req.params.postId;

  await reactionApi
    .removePostReaction(postId, userId)
    .then((response) =>
      res.status(response.httpStatusCode).send(response.message)
    )
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};

const addSharedPostReaction = async (req, res) => {
  const userId = req.userId;
  const sharedPostId = req.params.sharedPostId;
  const reaction = req.body.reaction;

  await reactionApi
    .addSharedPostReaction(sharedPostId, userId, reaction)
    .then((response) =>
      res.status(response.httpStatusCode).send(response.message)
    )
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};

const removeSharedPostReaction = async (req, res) => {
  const userId = req.userId;
  const sharedPostId = req.params.sharedPostId;

  await reactionApi
    .removePostReaction(sharedPostId, userId)
    .then((response) =>
      res.status(response.httpStatusCode).send(response.message)
    )
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};

const getAllFriendsRequest = async (res, req) => {
  const userId = req.userId;
  await userApi
    .getFriendsRequests(userId)
    .then((response) =>
      res.status(response.httpStatusCode).send(response.message)
    )
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};

const getAllFriends = async (res, req) => {
  const userId = req.userId;
  await userApi
    .getFriends(userId)
    .then((response) =>
      res.status(response.httpStatusCode).send(response.message)
    )
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};

const sendFriendRequest = async (req, res) => {
  const userId = req.userId;
  const friendRequestId = req.params.friendRequestId;

  await userApi
    .sendFriendRequest(userId, friendRequestId)
    .then((response) =>
      res.status(response.httpStatusCode).send(response.message)
    )
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};

const acceptFriendRequest = async (req, res) => {
  const userId = req.userId;
  const friendRequestId = req.params.friendRequestId;

  await userApi
    .acceptFriendRequest(userId, friendRequestId)
    .then((response) =>
      res.status(response.httpStatusCode).send(response.message)
    )
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};

const removeFriendRequest = async (req, res) => {
  const userId = req.userId;
  const friendRequestId = req.params.friendRequestId;

  await userApi
    .removeFriendRequest(userId, friendRequestId)
    .then((response) =>
      res.status(response.httpStatusCode).send(response.message)
    )
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};

const removeFriend = async (req, res) => {
  const userId = req.userId;
  const friendId = req.params.friendId;

  await userApi
    .removeFriend(userId, friendId)
    .then((response) =>
      res.status(response.httpStatusCode).send(response.message)
    )
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};

const blockFriend = async (req, res) => {
  const userId = req.userId;
  const friendId = req.params.friendId;

  await userApi
    .blockFriend(userId, friendId)
    .then((response) =>
      res.status(response.httpStatusCode).send(response.message)
    )
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};

const unblockFriend = async (req, res) => {
  const userId = req.userId;
  const friendId = req.params.friendId;

  await userApi
    .unblockFriend(userId, friendId)
    .then((response) =>
      res.status(response.httpStatusCode).send(response.message)
    )
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};

module.exports = {
  getProfile,
  getNewsfeed,
  sharePost,
  deleteSharedPost,
  updateSharedPost,
  uploadCoverPhoto,
  uploadProfilePhoto,
  addPostReaction,
  removePostReaction,
  addSharedPostReaction,
  removeSharedPostReaction,
  getAllFriendsRequest,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriendRequest,
  getAllFriends,
  removeFriend,
  blockFriend,
  unblockFriend,
};
