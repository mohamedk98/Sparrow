const User = require("../models/User");
const Post = require("../models/Posts");


class UserApi {

async getUser(userId){
const userFound = await User.findOne({_id:userId},"-password")
if (!userFound) {
    const error = new Error("User not found")
    error.httpStatusCode = 404
    return error
}

return userFound
}

  
}

module.exports = UserApi