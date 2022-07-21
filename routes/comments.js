const express = require("express");
const router = express.Router();
const {addComment, deleteComment, updateComment} = require("../controllers/commentsController")


router.post("/:postId",addComment)
router.delete("/:postId/:commentId",deleteComment)
router.patch("/:postId/:commentId",updateComment)



module.exports = router;
