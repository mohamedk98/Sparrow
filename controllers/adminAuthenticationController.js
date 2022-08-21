const admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto")
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
    .findById(adminId, "-password")
    .then((response) => res.status(200).send(response))
    .catch((error) => res.status(400).send(error));
};

const changeAdminImage = async (req, res) => {
  const newAdminImage = req.file.location;
  const adminId = req.id;
  admin
    .findByIdAndUpdate(adminId, { adminImage: newAdminImage }, { new: true })
    .then((response) => res.status(200).send(response))
    .catch((error) => res.status(400).send(error));
};

const changeAdminName = async (req, res) => {
  const adminId = req.id;
  const newFullName = req.body.fullName;

  const adminData = admin.findById(adminId, "-password");
  if (!adminData) {
    return res.status(400).send(adminData);
  } 

  try {
    adminData.fullName = newFullName;
    adminData.username = await `${req.body.fullName}-${crypto
      .randomBytes(12)
      .toString("hex")}`;
    const newAdminData = await adminData.save();
    return res.status(200).send(newAdminData);
  } catch {
    return res.status(400).send("An Error has Occured");
  }
};

const changeAdminPassword = async (req, res) => {
  const adminId = req.id;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const adminData = admin.findById(adminId);
  if (!adminData) {
    return res.status(400).send(adminData);
  }
  const passwordMatch = await bcrypt.compare(oldPassword, adminData.password);
  if (!passwordMatch) {
    return res.status(400).send("Incorrect Password");
  }
  try {
    const newHashedPassword = await bcrypt.hash(newPassword, 12);
    adminData.password = newHashedPassword;
    const newAdminData = await adminData.save();
    return res.status(200).send(newAdminData);
  } catch {
    return res.status(400).send("An Error has Occured");
  }
};
module.exports = {
  adminLogin,
  adminLogout,
  changeAdminImage,
  changeAdminName,
  changeAdminPassword,
  getAdminData,
};
