const express = require("express");
const { authorization } = require("../middlwares/authentication");
const router = express.Router();
const {getProfile, getNewsfeed} = require("../controllers/userController");

/* GET user profile  */
router.get("/profile", getProfile);
router.get("/newsfeed", getNewsfeed);

module.exports = router;
