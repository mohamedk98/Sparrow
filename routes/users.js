const express = require("express");
const router = express.Router();
const {
  getProfile,
  getNewsfeed,
  sharePost,
  updateSharedPost,
  deleteSharedPost,
  uploadCoverPhoto,
  uploadProfilePhoto,
  addPostReaction,
  removePostReaction,
  addSharedPostReaction,
  removeSharedPostReaction,
  getAllFriendsRequest,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriendRequest,
  getAllFriends,
  removeFriend,
  blockFriend,
  unblockFriend,
} = require("../controllers/userController");
const { coverImageUpload } = require("../middlwares/fileUpload");

/* user data router */
router.get("/profile", getProfile);
router.get("/newsfeed", getNewsfeed);

/** sharing post routes*/
router.post("/share/:sharedPostId", sharePost);
router.patch("/share/:sharedPostId", updateSharedPost);
router.delete("/share/:sharedPostId", deleteSharedPost);

/**Upload Profile related Images */
router.post(
  "/upload/coverImage",
  coverImageUpload.single("coverImage"),
  uploadCoverPhoto
);
router.post(
  "/upload/profileImage",
  coverImageUpload.single("profilePhoto"),
  uploadProfilePhoto
);

/**Reactions Routes */
router.post("/reaction/:postId", addPostReaction);
router.delete("/reaction/:postId", removePostReaction);
router.post("/reaction/:sharedPostId", addSharedPostReaction);
router.delete("/reaction/:sharedPostId", removeSharedPostReaction);

/**Friends Actions Routes */

//Friend Requests
router.get("/friends/friendRequest", getAllFriendsRequest);
router.post("/friends/friendRequest/:friendRequestId", sendFriendRequest);
router.patch("/friends/friendRequest/:friendRequestId", acceptFriendRequest);
router.delete("/friends/friendRequest/:friendRequestId", removeFriendRequest);

//Friend
router.get("/friends", getAllFriends);
router.delete("/friends/friend/:friendId", removeFriend);
router.patch("/friends/friend/:friendId", blockFriend);
router.patch("/friends/friend/:friendId", unblockFriend);

module.exports = router;
