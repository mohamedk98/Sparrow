const express = require("express");
const router = express.Router();
const {
  getProfile,
  getNewsfeed,
  getUserPosts,
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
  searchForPeople,
  updateIntro,
  updateAbout,
  updateHobbies,
  getSingleProfile
} = require("../controllers/userController");
const { coverImageUpload, profileImageUpload } = require("../middlwares/fileUpload");

/* user data router */
router.get("/:username", getProfile);
router.get("/newsfeed", getNewsfeed);
router.get("/profile/posts",getUserPosts)
// router.get("/profile/:username",getSingleProfile)

/** sharing post routes*/
router.post("/share/:postId", sharePost);
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
  profileImageUpload.single("profileImage"),
  uploadProfilePhoto
);

/**Reactions Routes */
router.post("/reaction/post/:postId", addPostReaction);
router.delete("/reaction/post/:postId", removePostReaction);
router.post("/reaction/sharedPost/:sharedPostId", addSharedPostReaction);
router.delete("/reaction/sharedPost/:sharedPostId", removeSharedPostReaction);

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

//search
router.get("/search/:keyword",searchForPeople)

//edit profile Data
router.patch("/profile/intro",updateIntro)
router.patch("/profile/about",updateAbout)
router.patch("/profile/hobbies",updateHobbies)



module.exports = router;
