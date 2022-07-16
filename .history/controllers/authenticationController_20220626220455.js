const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
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

  //if the email or username was already used,don't create account
  //else,create a new account

  User.findOne({ email }).then((user) => {
    if (!user) {
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email: email,
          password: hashedPassword,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: new Date(year, month, day),
          gender: gender,
        });
        user.save();
        res.send("Successfully registered");
      });
    } else {
      res.send("User registered before");
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
      res.send("Incorrect email or Password");
    } else {
      //Hashed password comparison
      bcrypt.compare(password, user.password).then((passwordIsTrue) => {
        if (passwordIsTrue) {
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
            .send("Login Successfully");
        } else {
          res.send("Incorrect email or Password");
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
    .json({ message: "Successfully logged out 😏 🍀" });
};

exports.login = login;
exports.logout = logout;
exports.signup = signup;
