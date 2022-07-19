const ReplyApi = require("../datasources/replyApi");
const replyApi = new ReplyApi();

const addReply = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const content = req.body.content;
  const replyDate = new Date().toISOString();
  replyApi
    .addReply({ postId, commentId,replyDate,content })
    .then((response) => res.send(response))
    .catch((error) => res.send(error));
};

const removeReply = (req, res) => {};

module.exports = { addReply, removeReply };
