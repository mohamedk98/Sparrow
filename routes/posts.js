const express = require("express");
const { imagesUpload } = require("../middlwares/fileUpload");
const router = express.Router();
const {
  createPost,
  deletePost,
  getPost,
  updatePost,
} = require("../controllers/postsController");

router.post("", imagesUpload.array("media"), createPost);
router.get("/:postId", getPost);
router.delete("/:postId", deletePost);
router.patch("/:postId", imagesUpload.array("media"), updatePost);

module.exports = router;
