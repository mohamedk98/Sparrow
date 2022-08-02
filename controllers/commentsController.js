const CommentsApi = require("../datasources/commentsApi");
const commentsApi = new CommentsApi();

const addComment = (req, res) => {
  const postId = req.params.postId;
  const userId = req.userId;
  const content = req.body.content;
  const commentDate = new Date().toISOString();

  commentsApi
    .addComment({ postId, userId, commentDate, content })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};

const deleteComment = (req, res) => {
  const commentId = req.params.commentId;
  const postId = req.params.postId;
  commentsApi
    .deleteComment(postId, commentId)
    .then((response) => {
      res.status(response.httpStatusCode).send(response.message);
    })
    .catch((error) => {
      res.status(error.httpStatusCode).send(error.message);
    });
};

const updateComment = (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const userId = req.userId;
  const content = req.body.content;
  commentsApi
    .updateComment({ postId, commentId, userId, content })
    .then((response) => {
      res.status(response.httpStatusCode).send(response.message);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};

/**Shared Post Comment Functionality */
const addSharedPostComment = (req, res) => {
  const sharedPostId = req.params.sharedPostId;
  const userId = req.userId;
  const content = req.body.content;
  const commentDate = new Date().toISOString();
  commentsApi
    .addSharedPostComment({ sharedPostId, userId, commentDate, content })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};

const deleteSharedPostComment = (req, res) => {
  const commentId = req.params.commentId;
  const sharedPostId = req.params.sharedPostId;
  commentsApi
    .deleteSharedPostComment(sharedPostId, commentId)
    .then((response) => {
      res.status(response.httpStatusCode).send(response.message);
    })
    .catch((error) => {
      res.status(error.httpStatusCode).send(error.message);
    });
};

const updateSharedPostComment = (req, res) => {
  const sharedPostId = req.params.sharedPostId;
  const commentId = req.params.commentId;
  const userId = req.userId;
  const content = req.body.content;
  commentsApi
    .updateSharedPostComment({ sharedPostId, commentId, userId, content })
    .then((response) => {
      res.status(response.httpStatusCode).send(response.message);
    })
    .catch((error) => {
      res.status(error.httpStatusCode).send(error.message);
    });
};

module.exports = {
  addComment,
  deleteComment,
  updateComment,
  addSharedPostComment,
  deleteSharedPostComment,
  updateSharedPostComment,
};
