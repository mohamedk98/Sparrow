/**
 * @swagger
 *  tags:
 *      name:User
 *      description: Manage user profile CRUD operation
 *          
 */


/**
 * @swagger
 * /profile:
 *  
 *   get:
 *     tags: [User] 
 *     description: return user profile data
 *     responses:
 *       200:
 *         description: Returns an object that contain user data.
 */



const express = require("express");
const { authentication } = require("../middlwares/authentication");
const router = express.Router();
const userController = require("../controllers/userController");



/* GET user profile  */
router.get("/profile", authentication, userController.getProfile);

module.exports = router;
