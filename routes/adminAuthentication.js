const express = require('express');
const router = express.Router();
const {adminLogin, adminLogout} = require("../controllers/adminAuthenticationController");

//Login handler
router.post("/admin/login", adminLogin)

//Logout handler
router.get("/admin/logout", adminLogout)

module.exports = router;