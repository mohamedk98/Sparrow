const jwt = require("jsonwebtoken");
const { redisClient } = require("../services/redisClient.service");
const redisUserSchema = require("../models/RedisRefreshToken");

const token = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  const refreshTokenId = req.body.refreshTokenId;
  const userCredentials = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
  const redisUserDataRepository = redisClient.fetchRepository(redisUserSchema);
  const redisUser = await redisUserDataRepository.fetch(refreshTokenId);
  const redisUserData = redisUser.entityData;
  console.log(redisUserData);
  console.log(userCredentials);
  if (
    !refreshToken ||
    !refreshTokenId ||
    userCredentials == null ||
    Object.keys(redisUserData).length === 0 ||
    userCredentials != redisUserData
  ) {
    return res.sendStatus(401);
  }

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

  redisUserDataRepository.save(redisUser).then((redisResponse) => {
    res
      .cookie("access_token", newJwtToken, {
        httpOnly: true,
        secure: false,
        //15 minutes token
        expires: new Date(Date.now() + 900000),
      })
      .send({
        refreshToken: refreshToken,
        refreshTokenId: redisResponse,
      });
  });
};

/**
 * a middleware to handle authentcation and authorization:
 * if the request cookies contain access_token cookies then
 * verify the hash itself and store the username and role of the user
 * or whatever the data that will be used in the request body and send
 * it on each request. that will achieve authorization
 */
const authentication = (req, res, next) => {
  const userToken = req.cookies.access_token;
  const TOKEN = process.env.TOKEN;
  if (!userToken) {
    return res.sendStatus(403);
  }

  try {
    const data = jwt.verify(userToken, TOKEN);
    req.userId = data.userId;
    req.email = data.email;
    req.username = data.username;
    next();
  } catch {
    return res.sendStatus(403);
  }
};

module.exports = { authentication, token };
