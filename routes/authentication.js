const express = require('express');
const router = express.Router();
const {autoLogin,logout,signup,login, verifyEmail, resetPassword, sendResetPasswordEmail, changePassword}= require("../controllers/authenticationController");
const { refreshToken } = require('../middlwares/authentication');
//POST Routes:
//-------------------------------------\\
//Login handler
router.post('/login',login );
//Singup handler
router.post('/signup',signup)
// Logout route
router.post('/logout',logout) 
//Refresh token route
router.post("/token", refreshToken);
//------------------------------------------------------------------\\
//GET Routes
//-------------------------------------\\
router.get('/autologin',autoLogin) 
//User account settings
router.get("/verifyEmail/:email",verifyEmail)
router.post("/reset",sendResetPasswordEmail)
router.post("/resetpassword",resetPassword)
router.post("/changepassword",changePassword)

module.exports = router;
