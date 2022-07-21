const express = require("express")
const { addReply, deleteReply,updateReply } = require("../controllers/replysController")
const router = express.Router()

router.post("/:postId/:commentId",addReply)
router.delete("/:postId/:commentId/:replyId",deleteReply)
router.patch("/:postId/:commentId/:replyId",updateReply)

module.exports = router