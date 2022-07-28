const PostsApi = require("../datasources/postsApi");
const postsApi = new PostsApi();
const User = require("../models/User");

const fileDeleteHandler = require("../utils/fileDelete");

const createPost = async (req, res) => {
  const content = req.body.content;
  const images = req.files;
  const userId = req.userId;
  const visiability = req.body.visiability;
  const postType = req.body.postType;
  const createdAt = new Date().toISOString();
  let media = images.map((image) => {
    return image.location;
  });

  const userData = await User.findOne({ _id: userId }, "firstName lastName");
  const creatorName = `${userData.firstName} ${userData.lastName}`;

  const postData = {
    userId,
    creatorName,
    createdAt,
    content,
    media,
    visiability,
    postType,
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

/**Delete a Post */
const deletePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.userId;

  const postData = await postsApi.getPost(postId);
  //if there is no post, return an error
  if (!postData) {
    return res.status(404).send({ message: "Post is not found" });
  }

  //if the user is not authorised to delete, return an error
  if (postData.userId !== userId) {
    return res
      .status(401)
      .send({ message: "You don't have access to delete this post" });
  }

  await postsApi
    .deletePost(postId)
    .then((response) => {
      res.status(200).send("Post Deleted");
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};

/**Get Single Post */
const getPost = async (req, res) => {
  const postId = req.params.postId;
  const response = await postsApi.getPost(postId);
  if (response.httpStatusCode === 404) {
    return res.status(response.httpStatusCode).send(response.message);
  } else {
    return res.status(200).send(response);
  }
};

/**Update Post */
const updatePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.userId;
  const images = req.files;
  const content = req.body.content;
  const visiability = req.body.visiability;
  let media = [];

  for (let image of images) {
    media.push(image.path);
  }

  let postData = await postsApi.getPost(postId);
  //if there is no post, return an error
  if (!postData) {
    return res.status(404).send({ message: "Post is not found" });
  }

  // const userData = await userApi.getUser(userId)
  //if the user is not authorised to delete, return an error
  if (postData.userId !== userId) {
    return res
      .status(401)
      .send({ message: "You don't have access to edit this post" });
  }

  //if the post contain media, just delete it
  if (postData.media.length !== 0) {
    fileDeleteHandler(postData.media);
  }
  const updatedPostData = {
    ...postData._doc,
    media: media,
    content: content,
    visiability: visiability,
  };
  await postsApi
    .updatePost(updatedPostData)
    .then((response) => {
      res.send(response.message);
    })
    .catch((error) => {
      res.send(error.message);
    });
};

module.exports = { createPost, deletePost, getPost, updatePost };
