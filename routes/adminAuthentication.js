const express = require('express');
const router = express.Router();
const {adminLogin} = require("../controllers/adminAuthenticationController");

//Login handler
router.post("/admin/login", adminLogin)

module.exports = router;