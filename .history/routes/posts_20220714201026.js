const express = require("express");
const { imagesUpload } = require("../middlwares/fileUpload");
const router = express.Router();
const {
  createPost,
  deletePost,
  getPost,
} = require("../controllers/postsController");

router.post("", imagesUpload.array("media"), createPost);
router.get("/:postId", getPost);
router.delete("/:postId", deletePost);
router.patch("");

module.exports = router;
