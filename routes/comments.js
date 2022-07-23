const express = require("express");
const router = express.Router();
const {addComment, deleteComment, updateComment, addSharedPostComment, deleteSharedPostComment, updateSharedPostComment} = require("../controllers/commentsController")

  /**Post Comment Routes */
router.post("/:postId",addComment)
router.delete("/:postId/:commentId",deleteComment)
router.patch("/:postId/:commentId",updateComment)

  /**Shared Post Comment Routes */
router.post("/:sharedPostId",addSharedPostComment)
router.delete("/:sharedPostId/:commentId",deleteSharedPostComment)
router.patch("/:sharedPostId/:commentId",updateSharedPostComment)



module.exports = router;
