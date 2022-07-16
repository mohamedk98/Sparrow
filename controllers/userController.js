const User = require("../models/User");
const Post = require("../models/Posts")

const getProfile = (req, res) => {
  const userEmail = req.email;
  User.findOne({ email: userEmail }, "-password").then((response) => {
    res.status(200).send(response);
  });
};

module.exports = { getProfile };
