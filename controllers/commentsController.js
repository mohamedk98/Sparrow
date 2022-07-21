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
      res.send(error.httpStatusCode).send(error.message);
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
    .updateComment({ postId,commentId, userId, content })
    .then((response) => {
      res.status(response.httpStatusCode).send(response.message);
    })
    .catch((error) => {
      res.status(error.httpStatusCode).send(error.message);
    });
};
module.exports = { addComment, deleteComment, updateComment };
