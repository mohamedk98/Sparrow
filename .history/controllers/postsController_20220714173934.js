const postsApi = require("../datasources/postsApi");
const crypto = require("crypto");

const createPost = async (req, res) => {
  const content = req.body.content;
  const images = req.files;
  const userId = req.userId;

  const postId = crypto.randomBytes(32).toString("hex");
  const createdAt = new Date().toISOString();
  const media = [...images.path];
  const postsData = {
    postId,
    userId,
    creatorName,
    createdAt,
    content,
    media,
  };
  postsApi.createPost();
};

module.exports = { createPost };
