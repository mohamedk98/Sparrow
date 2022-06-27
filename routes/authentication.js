const express = require('express');
const router = express.Router();
const authentcationController = require("../controllers/authenticationController")
//POST Routes:
//-------------------------------------\\
//Login handler
router.post('/login',authentcationController.login );
//Singup handler
router.post('/signup',authentcationController.signup)


//------------------------------------------------------------------\\
//GET Routes
//-------------------------------------\\
// Logout route
router.get('/logout',authentcationController.logout) 
module.exports = router;