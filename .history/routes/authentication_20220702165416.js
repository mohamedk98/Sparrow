const express = require('express');
const router = express.Router();
const {autoLogin,logout,signup,login}= require("../controllers/authenticationController")
//POST Routes:
//-------------------------------------\\
//Login handler
router.post('/login',login );
//Singup handler
router.post('/signup',signup)
// Logout route
router.post('/logout',logout) 

//------------------------------------------------------------------\\
//GET Routes
//-------------------------------------\\
router.get('/autologin',autoLogin) 

module.exports = router;