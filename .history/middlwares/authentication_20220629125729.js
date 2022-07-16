const jwt = require("jsonwebtoken");
const { redisClient, connectToRedis } = require("../services/redisClient.service");
const redisUserSchema = require("../models/RedisRefreshToken");
const { validateRefreshToken } = require("../services/token.service");

const refreshToken = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken)
  const refreshTokenId = req.body.refreshTokenId;
  const hasExpiry = req.body.hasExpiry;
  const userCredentials =  await validateRefreshToken(refreshToken,process.env.REFRESH_TOKEN)
  connectToRedis()
  const redisUserDataRepository = redisClient.fetchRepository(redisUserSchema);
  const redisUser = await redisUserDataRepository.fetch(refreshTokenId);
  const redisUserData = redisUser.entityData;


  if (
    !refreshToken ||
    !refreshTokenId ||
    userCredentials == null ||
    Object.keys(redisUserData).length === 0
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
        expires: hasExpiry ? new Date(Date.now() + 900000) : 0,
      })
      .send({
        refreshToken: refreshToken,
        refreshTokenId: redisResponse,
        hasExpiry: hasExpiry,
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
    return res.sendStatus(401);
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

module.exports = { authentication, refreshToken };
