const User = require("../models/User");
const Post = require("../models/Posts");
const UserApi = require("../datasources/userApi");
const userApi = new UserApi();
const SharedPostApi = require("../datasources/sharedPostApi");
const sharedPostApi = new SharedPostApi();

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
      res.status(response.httpStatusCode).send(response.message);
    })
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};
const uploadProfilePhoto = async (req, res) => {
  const profileImage = req.file;
  const userId = req.userId;

  await userApi
    .profileImageUpload(userId, profileImage.location)
    .then((response) => {
      res.status(response.httpStatusCode).send(response.message);
    })
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};
module.exports = {
  getProfile,
  getNewsfeed,
  sharePost,
  deleteSharedPost,
  updateSharedPost,
  uploadCoverPhoto,
};
