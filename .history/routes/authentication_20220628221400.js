const express = require('express');
const router = express.Router();
const authentcationController = require("../controllers/authenticationController")
//POST Routes:
//-------------------------------------\\
//Login handler
router.post('/login',authentcationController.login );
//Singup handler
router.post('/signup',authentcationController.signup)
// Logout route
router.post('/logout',authentcationController.logout) 

//------------------------------------------------------------------\\
//GET Routes
//-------------------------------------\\

module.exports = router;