const express = require("express");
const router = express.Router();
const {getAllUsers, deleteUser, getAllPosts, deletePost, createAdmin} = require("../controllers/adminController")

/* Admin data router */
router.post("/create-admin",createAdmin)

/* user data router */
router.get("/users",getAllUsers)
router.delete("/users/:userId", deleteUser);

/* post data router */
router.get("/posts", getAllPosts);
router.delete("/posts/:postId", deletePost);

module.exports = router;