const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { createToken } = require("../middlwares/authentication");

const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const day = req.body.day;
  const month = req.body.month;
  const year = req.body.year;
  const gender = req.body.gender;
  const dateOfBirth = new Date(`${day}/${month}/${year}`)
    .toLocaleString()
    .split(",")[0];
  //if the email or username was already used,don't create account
  //else,create a new account

  User.findOne({ email }).then((user) => {
    if (!user) {
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          //generate Random userID
          userID: crypto.randomBytes(16).toString("hex"),
          //generate unique username by adding firstName-lastName-random number
          username: `${firstName}-${lastName}-${crypto
            .randomBytes(12)
            .toString("hex")}`,
          email: email,
          password: hashedPassword,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
          age: new Date().getFullYear() - new Date(dateOfBirth).getFullYear(),
          gender: gender,
        });
        user.save();
        res.status(200).send({ message: "Successfully registered" });
      });
    } else {
      res.status(400).send({ message: "User Already Registered" });
    }
  });
};

const login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const TOKEN = process.env.TOKEN;
  //if the user is found and the password is correct, add a jwt token to the
  //cookie with a certain expiry date
  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(400).send({ message: "Incorrect email or Password" });
    } else {
      //Hashed password comparison
      bcrypt.compare(password, user.password).then((passwordIsTrue) => {
        if (passwordIsTrue) {
          req.userId = user.userID;
          req.username = user.username;
          req.email = user.email;

          let accessToken = createToken(user.username, user.email);

          res
            .cookie("access_token", accessToken, {
              httpOnly: true,
              secure: false,
              sameSite: "strict",
              expires: new Date(Date.now() + 900000),
            })
            .send({
              userId: user.userId,
              username: user.username,
              email: user.email,
            });
        } else {
          res.status(400).send({ message: "Incorrect email or Password" });
        }
      });
    }
  });
};

//clear the access_token cookie to logout
const logout = (req, res, next) => {
  res
    .clearCookie("access_token")
    .status(200)
    .send({ message: "Successfully logged out 😏 🍀" });
};

exports.login = login;
exports.logout = logout;
exports.signup = signup;
