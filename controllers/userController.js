const User = require("../models/User");
const Post = require("../models/Posts");
const UserApi = require("../datasources/userApi");
const userApi = new UserApi();
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
    .then((response) => res.send(response))
    .catch((error) => res.send(error));
};
module.exports = { getProfile, getNewsfeed };
