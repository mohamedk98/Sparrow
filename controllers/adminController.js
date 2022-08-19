const userApi = require("../models/User");
const postApi = require("../models/Posts");
const adminApi = require("../models/Admin");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const createAdmin = async (req, res) => {
  const username = `${req.body.fullName}-${crypto
    .randomBytes(12)
    .toString("hex")}`;
  const email = req.body.email;
  const password = req.body.password;
  const fullName = req.body.fullName;

  const hashedPassword = await bcrypt.hash(password, 12);

  const existAdmin = await adminApi.findOne({email:email})
  if (existAdmin){
    return res.status(400).send("Admin already exists")
  }
  new adminApi({
    username,
    email,
    password: hashedPassword,
    fullName,
  })
    .save()
    .then((response) => res.status(200).send("Admin is created successfully"))
    .catch((error) => res.status(400).send(error));
};

const getAllUsers = (req, res, next) => {
  userApi
    .find({})
    .then((response) => res.status(200).send(response))
    .catch((error) => res.status(400).send(error));
};

const deleteUser = (req, res) => {
  const userId = req.params.userId;
  userApi
    .deleteOne({ _id: userId })
    .then((response) => res.status(200).send("User is deleted successfully"))
    .catch((error) => res.status(400).send(error));
};

const getAllPosts = (req, res) => {
  postApi
    .find({})
    .then((response) => res.status(200).send(response))
    .catch((error) => res.status(400).send(error));
};

const deletePost = async (req, res) => {
  const postId = req.params.postId;
  postApi
    .findByIdAndDelete(postId)
    .then((response) => res.status(200).send("Post is deleted successfully"))
    .catch((error) => res.status(400).send(error));
};

module.exports = {
  getAllUsers,
  deleteUser,
  getAllPosts,
  deletePost,
  createAdmin,
};
