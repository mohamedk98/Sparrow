const express = require("express");
const { authentication } = require("../middlwares/authentication");
const router = express.Router();
const userController = require("../controllers/userController")
/* GET users listing. */
router.get("/profile", authentication, userController.getProfile);

module.exports = router;
