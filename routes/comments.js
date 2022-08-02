const express = require("express");
const router = express.Router();
const {addComment, deleteComment, updateComment, addSharedPostComment, deleteSharedPostComment, updateSharedPostComment} = require("../controllers/commentsController")

  /**Post Comment Routes */
router.post("/comment/:postId",addComment)
router.delete("/comment/:postId/:commentId",deleteComment)
router.patch("/comment/:postId/:commentId",updateComment)

  /**Shared Post Comment Routes */
router.post("/comment/sharedPost/:sharedPostId",addSharedPostComment)
router.patch("/comment/sharedPost/:sharedPostId/:commentId",updateSharedPostComment)
router.delete("/comment/sharedPost/:sharedPostId/:commentId",deleteSharedPostComment)




module.exports = router;
