const admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const adminLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  admin.findOne({email:email})
  .then(async (data)=>{
    if(!data){
      let error = new Error ("wrong username or password")
      error.status = 401;
      return res.status(400).send(error.message)

    }
    let isPasswordMatch = await bcrypt.compare(password, data.password)
    if(!isPasswordMatch){
      let error = new Error ("wrong username or password")
      error.status = 401;
      return res.status(400).send(error.message)
    }
    let token = jwt.sign({
      id: data._id,
      email:data.email,
      username:data.username,
      role:"admin"
    }, 
    process.env.TOKEN,
    {expiresIn:"1h"}
    )
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).send(token)
  })
  .catch(error=> next(error))
  };

module.exports = {adminLogin}