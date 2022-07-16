const express = require("express");
const { authorization } = require("../middlwares/authentication");
const router = express.Router();
const {getProfile} = require("../controllers/userController");

/* GET user profile  */
router.get("/profile", getProfile);

module.exports = router;
