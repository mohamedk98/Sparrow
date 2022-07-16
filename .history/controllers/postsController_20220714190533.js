const postsApi = require("../datasources/postsApi");
const User = require("../models/User")
const crypto = require("crypto");

const createPost = async (req, res) => {
  const content = req.body.content;
  const images = req.files.path;
  const userId = req.userId;

  const postId = crypto.randomBytes(32).toString("hex");
  const createdAt = new Date().toISOString();
  const media = [...images]
    console.log(media)
  const userData = await User.findOne({userId:userId},"firstName lastName")
  const creatorName = `${userData.firstName} ${userData.lastName}`

  const postData = {
    postId,
    userId,
    creatorName,
    createdAt,
    content,
    media,
  };
  postsApi
    .createPost(postData)
    .then((response) => {
      res.send(response.message);
    })
    .catch((error) => {
      res.status(error.httpStatusCode).send(error.message);
    });
};

module.exports = { createPost };
