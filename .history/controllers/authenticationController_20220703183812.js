const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {
  createRedisRefreshToken,
  createToken,
  createRefreshToken,
  removeRefreshToken,
  checkRedisRefreshToken,
  updateRedisRefreshTokensIndex,
  createRememberToken,
} = require("../services/token.service");

/**Singup controller
 * it returns either success message or failure based on the error
 */
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
          userId: crypto.randomBytes(16).toString("hex"),
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

/**Login Controller */
const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const hasExpiry = req.body.hasExpiry;
  let rememberToken = null;
  //incase of redis flushing (will be used in admin panel after flushing)
  updateRedisRefreshTokensIndex();
  //if the user is found and the password is correct, add a jwt token to the
  //cookie with a certain expiry date
  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(400).send({ message: "Incorrect email or Password" });
    } else {
      //Hashed password comparison
      bcrypt.compare(password, user.password).then(async (passwordIsTrue) => {
        if (passwordIsTrue) {
          req.userId = user.userId;
          req.username = user.username;
          req.email = user.email;
          //Create jwt token
          let accessToken = createToken(user.username, user.email, user.userId);
          //Create refresh token
          let refreshToken = createRefreshToken(
            user.username,
            user.email,
            user.userId
          );
          /**if the user chose remember me option, it will create a remember token to be used 
         in auto login */
          if (hasExpiry) {
            rememberToken = createRememberToken({
              username: user.username,
              email: user.email,
              userId: user.userId,
            });
            res.cookie("remember_token", rememberToken, {
              httpOnly: true,
              secure: false,
              //30 days token
              expires: hasExpiry
                ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                : 0,
            });
          }
          //Check existing redis token
          await checkRedisRefreshToken(user.email);
          //Create redis refresh token
          await createRedisRefreshToken({
            username: user.username,
            email: user.email,
            userId: user.userId,
            refreshToken: refreshToken,
          });
          res
            .cookie("access_token", accessToken, {
              httpOnly: true,
              secure: false,
              //1 day token
              expires: hasExpiry
                ? new Date(Date.now() + 24 * 60 * 60 * 1000)
                : 0,
            })
            .send({
              refreshToken: refreshToken,
              hasExpiry: hasExpiry,
            });
        } else {
          res.status(400).send({ message: "Incorrect email or Password" });
        }
      });
    }
  });
};

/** clear the access_token cookie to logout */
const logout = (req, res, next) => {
  const refreshTokenId = req.body.refreshTokenId;
  removeRefreshToken(refreshTokenId).then(() => {
    res
      .clearCookie("access_token")
      .clearCookie("remember_token")
      .status(200)
      .send({ message: "Successfully logged out 😏 🍀" });
  });
};

//Auto login controller
const autoLogin = async (req, res) => {
  const rememberToken = req.cookies.remember_token;
  const rememberTokenData = jwt.verify(
    rememberToken,
    process.env.REMEMBER_TOKEN
  );

  if (rememberTokenData === null) {
    return res.sendStatus(401);
  }

  req.userId = rememberTokenData.userId;
  req.username = rememberTokenData.username;
  req.email = rememberTokenData.email;

  const accessToken = createToken(
    rememberTokenData.username,
    rememberTokenData.email,
    rememberTokenData.userId
  );
  const refreshToken = createRefreshToken(
    rememberTokenData.username,
    rememberTokenData.email,
    rememberTokenData.userId
  );
  createRememberToken({
    username: rememberTokenData.username,
    email: rememberTokenData.email,
    userId: rememberTokenData.userId,
  });

  await checkRedisRefreshToken(rememberTokenData.email);
  await createRedisRefreshToken({
    username: rememberTokenData.username,
    email: rememberTokenData.email,
    userId: rememberTokenData.userId,
    refreshToken: refreshToken,
  });

  res
    .cookie("access_token", accessToken, {
      httpOnly: true,
      secure: false,
      //1 day token
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })
    .cookie("remember_token", rememberToken, {
      httpOnly: true,
      secure: false,
      //30 days token
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })
    .send({
      refreshToken: refreshToken,
      hasExpiry: true,
    });
};

module.exports = { autoLogin, logout, signup, login };
