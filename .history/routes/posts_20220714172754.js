const express = require("express");
const {imagesUpload } = require("../middlwares/fileUpload");
const router = express.Router();
const {createPost} = require("../controllers/postsController");


router.post("",imagesUpload.array("media"),createPost);
router.get("/:postId");
router.delete("/:postId");
router.patch("");

module.exports = router;
