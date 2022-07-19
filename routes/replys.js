const express = require("express")
const { addReply, removeReply } = require("../controllers/replysController")
const router = express.Router()

router.post("/:postId/:commentId",addReply)
router.delete("/:postId/:commentId",removeReply)

module.exports = router