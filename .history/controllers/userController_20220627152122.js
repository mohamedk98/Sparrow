const User = require("../models/User");

const getProfile = (req,res)=>{
const userId = req.userId
console.log(userId)
User.findOne({userId}).then((response)=>{
    res.send(response)
})
}



module.exports = {getProfile}