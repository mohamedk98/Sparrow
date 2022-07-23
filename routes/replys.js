const express = require("express")
const { addReply, deleteReply,updateReply,addSharedPostReply,deleteSharedPostReply,updateSharedPostReply } = require("../controllers/replysController")
const router = express.Router()

router.post("/:postId/:commentId",addReply)
router.delete("/:postId/:commentId/:replyId",deleteReply)
router.patch("/:postId/:commentId/:replyId",updateReply)

router.post("/:sharedPostId/:commentId",addSharedPostReply)
router.delete("/:sharedPostId/:commentId/:replyId",deleteSharedPostReply)
router.patch("/:sharedPostId/:commentId/:replyId",updateSharedPostReply)

module.exports = router