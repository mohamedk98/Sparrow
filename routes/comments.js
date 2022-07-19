const express = require("express");
const router = express.Router();
const {addComment, deleteComment} = require("../controllers/commentsController")


router.post("/:postId",addComment)
router.delete("/:postId/:commentId",deleteComment)



module.exports = router;
