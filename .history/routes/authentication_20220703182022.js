const express = require('express');
const router = express.Router();
const {autoLogin,logout,signup,login}= require("../controllers/authenticationController");
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


module.exports = router;