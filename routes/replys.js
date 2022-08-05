const express = require("express");
const {
  addReply,
  deleteReply,
  updateReply,
  addSharedPostReply,
  deleteSharedPostReply,
  updateSharedPostReply,
} = require("../controllers/replysController");
const router = express.Router();

router.post("/reply/post/:postId/:commentId", addReply);
router.delete("/reply/post/:postId/:commentId/:replyId", deleteReply);
router.patch("/reply/post/:postId/:commentId/:replyId", updateReply);

router.post("/reply/sharedPost/:sharedPostId/:commentId", addSharedPostReply);
router.delete(
  "/reply/sharedPost/:sharedPostId/:commentId/:replyId",
  deleteSharedPostReply
);
router.patch(
  "/reply/sharedPost/:sharedPostId/:commentId/:replyId",
  updateSharedPostReply
);

module.exports = router;
