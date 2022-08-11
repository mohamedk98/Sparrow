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
  getSingleProfile,
  selectCoverPhotoFromMedia,
  addCommentReaction,
  removeCommentReaction,
  addReplyReaction,
  updateName,
  updatePassword
} = require("../controllers/userController");
const { coverImageUpload, profileImageUpload } = require("../middlwares/fileUpload");

/* user data router */
router.get("/profile",getProfile)
router.get("/newsfeed/:page", getNewsfeed);
router.get("/profile/posts",getUserPosts)


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
router.post("/reaction/post/:postId/:commentId", addCommentReaction);
router.delete("/reaction/post/:postId/:commentId", removeCommentReaction);
router.post("/reaction/post/:postId/:commentId/:replyId", addReplyReaction);

/**Friends Actions Routes */

//Friend Requests
router.get("/friends/friendRequest", getAllFriendsRequest);
router.post("/friends/friendRequest/:friendRequestId", sendFriendRequest);
router.patch("/friends/friendRequest/:friendRequestId", acceptFriendRequest);
router.delete("/friends/friendRequest/:friendRequestId", removeFriendRequest);

//Friend
router.get("/friends", getAllFriends);
router.delete("/friends/friend/:friendId", removeFriend);
router.post("/friends/friend/block/:friendId", blockFriend);
router.patch("/friends/friend/block/:friendId", unblockFriend);

//search
router.get("/search/:keyword",searchForPeople)

//edit profile Data
router.patch("/profile/intro",updateIntro)
router.patch("/profile/about",updateAbout)
router.patch("/profile/hobbies",updateHobbies)
router.patch("/profile/coverImage",selectCoverPhotoFromMedia)
router.patch("/profile/name",updateName)
router.patch("/profile/changePassword",updatePassword)



//get user profile
router.get("/:username",getSingleProfile );


module.exports = router;
