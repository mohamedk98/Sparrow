



const express = require("express");
const { authorization } = require("../middlwares/authentication");
const router = express.Router();
const userController = require("../controllers/userController");



/* GET user profile  */
router.get("/profile", authorization, userController.getProfile);

module.exports = router;
