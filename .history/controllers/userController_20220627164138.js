const User = require("../models/User");

const getProfile = (req,res)=>{
const userEmail = req.email
User.findOne({email:userEmail},{}).then((response)=>{
    res.send(response)
})
}



module.exports = {getProfile}