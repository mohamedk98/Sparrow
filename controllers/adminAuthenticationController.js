const admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  admin
    .findOne({ email: email })
    .then(async (data) => {
      if (!data) {
        let error = new Error("wrong username or password");
        error.status = 401;
        return res.status(400).send(error.message);
      }
      let isPasswordMatch = await bcrypt.compare(password, data.password);
      if (!isPasswordMatch) {
        let error = new Error("wrong username or password");
        error.status = 401;
        return res.status(400).send(error.message);
      }
      let token = jwt.sign(
        {
          id: data._id,
          email: data.email,
          username: data.username,
          role: "admin",
        },
        process.env.TOKEN,
        { expiresIn: "1h" }
      );
      res.setHeader("Authorization", `Bearer ${token}`);
      res.status(200).send(token);
    })
    .catch((error) => next(error));
};

const adminLogout = async (req, res) => {
  res.setHeader("Authorization", `Bearer ${null}`);
  res.status(200).send({ message: "Successfully logged out 😏 🍀" });
};

const getAdminData = async (req, res) => {
  const adminId = req.id;

  admin
    .findById(adminId)
    .then((response) => res.status(200).send(response))
    .catch((error) => res.status(400).send(error));
};

const changeAdminImage = async (req, res) => {
  const newAdminImage = req.file.location;
  const adminId = req.id;
  admin
    .findByIdAndUpdate(adminId, { adminImage: newAdminImage })
    .then((response) => res.status(200).send("Image Changed Successfully"))
    .catch((error) => res.status(400).send(error));
};
module.exports = { adminLogin, adminLogout, changeAdminImage,getAdminData };
