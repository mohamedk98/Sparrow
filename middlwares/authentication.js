const jwt = require("jsonwebtoken");

const { userDataRepository } = require("../models/RedisRefreshToken");
const { redisClient } = require("../services/redisClient.service");
const { validateRefreshToken } = require("../services/token.service");

const refreshToken = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  const hasExpiry = req.body.hasExpiry;


  if (refreshToken === null || refreshToken === undefined) {
    return res.sendStatus(401);
  }

  const redisUser = await userDataRepository
    .search()
    .where("refreshToken")
    .equalTo(refreshToken)
    .returnAll();

  if (redisUser === null || redisUser === undefined) {
    return res.sendStatus(401);
  }
  const redisUserData = redisUser[0]?.entityData;

  req.userId = redisUserData.userId;
  req.username = redisUserData.username;
  req.email = redisUserData.email;

  const newJwtToken = jwt.sign(
    {
      userId: redisUserData.userId,
      username: redisUserData.username,
      email: redisUserData.email,
    },
    process.env.TOKEN
  );

  await userDataRepository.save(redisUser[0]);
  //add expiry time to token of 7 days
  await redisClient.execute([
    "EXPIRE",
    `UserEnitity:${redisUser[0].entityId}`,
    7 * 24 * 60 * 60,
  ]);
  res.setHeader("Authorization", `Bearer ${newJwtToken}`);
  res
    // .cookie("access_token", newJwtToken, {
    //   httpOnly: true,
    //   secure: false,
    //   //15 minutes token
    //   expires: hasExpiry ? new Date(Date.now() + 24 * 60 * 60 * 1000) : 0,
    // })
    .send({
      refreshToken: redisUserData.refreshToken,
      hasExpiry: hasExpiry,
      accessToken:newJwtToken
    });
};

/**
 * a middleware to handle authentcation and authorization:
 * if the request cookies contain access_token cookies then
 * verify the hash itself and store the username and role of the user
 * or whatever the data that will be used in the request body and send
 * it on each request. that will achieve authorization
 */
const authorization = (req, res, next) => {
  // const userToken = req.cookies.access_token || req.headers["authorization"];
  const bearerHeader = req.headers.authorization 

  const TOKEN = process.env.TOKEN;
  if (typeof bearerHeader === "undefined") {
    return res.sendStatus(401);
  }

  try {
    const userToken = bearerHeader.split(" ")[1];
    const data = jwt.verify(userToken, TOKEN);
    req.userId = data.userId;
    req.email = data.email;
    req.username = data.username;
    next();
  } catch {
    return res.sendStatus(401);
  }
};

module.exports = { authorization, refreshToken };
