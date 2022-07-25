const express = require("express");
const router = express.Router();
const {addComment, deleteComment, updateComment, addSharedPostComment, deleteSharedPostComment, updateSharedPostComment} = require("../controllers/commentsController")

  /**Post Comment Routes */
router.post("/comment/:postId",addComment)
router.delete("/comment/:postId/:commentId",deleteComment)
router.patch("/comment/:postId/:commentId",updateComment)

  /**Shared Post Comment Routes */
router.post("/replyComment/:sharedPostId",addSharedPostComment)
router.delete("/replyComment/:sharedPostId/:commentId",deleteSharedPostComment)
router.patch("/replyComment/:sharedPostId/:commentId",updateSharedPostComment)



module.exports = router;
