const express = require("express");
// const { } = require("../middlwares/authentication");
const router = express.Router();
// const userController = require("../controllers/userController");

/* GET user profile  */
router.post("/profile");
router.get("/profile");
router.delete("/profile");
router.put("/profile");

module.exports = router;
