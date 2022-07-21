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
} = require("../services/token.service");
const AuthenticationApi = require("../datasources/authenticationApi");

/**Singup controller
 * it returns either success message or failure based on the error
 */
const signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;
  const date = req.body.date;

  //Hashed password
  const hashedPassword = await bcrypt.hash(password, 12);
  //generate Random userID
  const userId = crypto.randomBytes(16).toString("hex");
  //generate unique username by adding firstName-lastName-random number
  const username = `${firstName}-${lastName}-${crypto
    .randomBytes(12)
    .toString("hex")}`;

  AuthenticationApi.signup({
    userId,
    username,
    firstName,
    lastName,
    email,
    hashedPassword,
    date,
    gender,
  })
    .then((response) => {
      res.status(response.httpStatusCode).send(response.message);
    })
    .catch((error) => {
      res.status(error.httpStatusCode).send(error.message);
    });
};

/**Login Controller
 * if the user is found and the password is correct, add a jwt token to the
 * cookie with a certain expiry date
 */
const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const hasExpiry = req.body.hasExpiry;
  //incase of redis flushing (will be used in admin panel after flushing)
  await updateRedisRefreshTokensIndex();

  const userData = await AuthenticationApi.login(email);
  try {
    const passwordIsTrue = await bcrypt.compare(password, userData.password);
    if (passwordIsTrue) {
      req.userId = userData._id;
      req.username = userData.username;
      req.email = userData.email;
      //Create jwt token
      let accessToken = createToken(
        userData.username,
        userData.email,
        userData._id,
        hasExpiry
      );
      //Create refresh token
      let refreshToken = createRefreshToken(
        userData.username,
        userData.email,
        userData._id.toString()
      );

      //Check existing redis token
      await checkRedisRefreshToken(userData.email);
      //Create redis refresh token
      await createRedisRefreshToken({
        username: userData.username,
        email: userData.email,
        userId: userData._id.toString(),
        refreshToken: refreshToken,
      });

      res.setHeader("Authorization", `Bearer ${accessToken}`);

      res.send({
        refreshToken,
        accessToken,
        hasExpiry,
      });
    } else {
      return res.status(400).send({ message: "Incorrect email or Password" });
    }
  } catch {
    return res.status(400).send({ message: "Incorrect email or Password" });
  }
};

/** clear the access_token cookie to logout */
const logout = async (req, res) => {
  const refreshTokenId = req.body.refreshTokenId;
  await removeRefreshToken(refreshTokenId);
  res.setHeader("Authorization", `Bearer ${null}`);
  res.status(200).send({ message: "Successfully logged out 😏 🍀" });
};

/**Auto login controller
 *
 */

const autoLogin = async (req, res) => {
  let bearerHeader = req.headers.authorization;

  if (bearerHeader === "Bearer undefined" || bearerHeader === "Bearer null") {
    return res.sendStatus(401);
  }
  try {
  const userAccessToken = bearerHeader.split(" ")[1];

  
    const accessTokenData = jwt.verify(userAccessToken, process.env.TOKEN);
    if (accessTokenData === null) {
      return res.sendStatus(401);
    }

    req.userId = accessTokenData.userId;
    req.username = accessTokenData.username;
    req.email = accessTokenData.email;

    const accessToken = createToken(
      accessTokenData.username,
      accessTokenData.email,
      accessTokenData.userId,
      accessTokenData.hasExpiry
    );
    const refreshToken = createRefreshToken(
      accessTokenData.username,
      accessTokenData.email,
      accessTokenData.userId
    );

    await checkRedisRefreshToken(accessTokenData.email);
    await createRedisRefreshToken({
      username: accessTokenData.username,
      email: accessTokenData.email,
      userId: accessTokenData.userId,
      refreshToken: refreshToken,
    });
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    res.send({
      refreshToken,
      accessToken,
      hasExpiry: accessTokenData.hasExpiry,
    });
  } catch {
    res.status(401).send("Unauthorised");
  }
};

module.exports = { autoLogin, logout, signup, login };
