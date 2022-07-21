const ReplyApi = require("../datasources/replyApi");
const replyApi = new ReplyApi();

const addReply = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const userId = req.userId;
  const content = req.body.content;
  const replyDate = new Date().toISOString();
  replyApi
    .addReply({ postId, commentId, userId, replyDate, content })
    .then((response) => res.send(response))
    .catch((error) => res.send(error));
};

const deleteReply = (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const replyId = req.params.replyId;
  const userId = req.userId;

  replyApi
    .deleteReply({ postId, commentId, replyId, userId })
    .then((response) =>
      res.status(response.httpStatusCode).send(response.message)
    )
    .catch((error) => res.status(error.httpStatusCode).send(error.message));
};

const updateReply = (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const replyId = req.params.replyId;
  const userId = req.userId;
  const content = req.body.content;

  replyApi
    .updateReply({ postId, commentId, replyId, userId, content })
    .then((response) => res.status(response.httpStatusCode).send(response))
    .catch((error) => res.status(error.httpStatusCode).send(error));
};

module.exports = { addReply, deleteReply, updateReply };
