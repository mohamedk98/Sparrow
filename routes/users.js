const express = require("express");
const { authorization } = require("../middlwares/authentication");
const router = express.Router();
const {
  getProfile,
  getNewsfeed,
  sharePost,
  updateSharedPost,
  deleteSharedPost,
  uploadCoverPhoto,
  uploadProfilePhoto
} = require("../controllers/userController");
const { coverImageUpload } = require("../middlwares/fileUpload");

/* user data router */
router.get("/profile", getProfile);
router.get("/newsfeed", getNewsfeed);

/** sharing post routes*/
router.post("/share/:sharedPostId", sharePost);
router.patch("/share/:sharedPostId", updateSharedPost);
router.delete("/share/:sharedPostId", deleteSharedPost);

router.post("/upload/coverImage",coverImageUpload.single("coverImage"),uploadCoverPhoto)
router.post("/upload/profileImage",coverImageUpload.single("profilePhoto"),uploadProfilePhoto)

module.exports = router;
