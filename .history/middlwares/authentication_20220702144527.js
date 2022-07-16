const jwt = require("jsonwebtoken");
const {
  redisClient,
  connectToRedis,
} = require("../services/redisClient.service");
const {
  redisUserSchema,
  userDataRepository,
} = require("../models/RedisRefreshToken");
const { validateRefreshToken } = require("../services/token.service");

const refreshToken = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  const hasExpiry = req.body.hasExpiry;
  const userCredentials = await validateRefreshToken(
    refreshToken,
    process.env.REFRESH_TOKEN
  );
  const redisUser = await userDataRepository
    .search()
    .where("refreshToken")
    .equalTo(refreshToken)
    .returnAll();
  const redisUserData = redisUser[0].entityData;
  console.log(redisUserData);
  if (
    !refreshToken ||
    userCredentials == null ||
    Object.keys(redisUserData).length === 0
  ) {
    res.sendStatus(401);
  } else {
    const newJwtToken = jwt.sign(
      {
        userId: redisUserData.userId,
        username: redisUserData.username,
        email: redisUserData.email,
      },
      process.env.TOKEN
    );

    req.userId = redisUserData.userId;
    req.username = redisUserData.username;
    req.email = redisUserData.email;

    // {
    //   ...redisUserData,
    //   refreshToken: newJwtToken,
    // }
    await userDataRepository.save(userDataRepository);
    res
      .cookie("access_token", newJwtToken, {
        httpOnly: true,
        secure: false,
        //15 minutes token
        expires: hasExpiry ? new Date(Date.now() + 10000) : 0,
      })
      .send({
        refreshToken: newJwtToken,
        hasExpiry: hasExpiry,
      });
  }
};

/**
 * a middleware to handle authentcation and authorization:
 * if the request cookies contain access_token cookies then
 * verify the hash itself and store the username and role of the user
 * or whatever the data that will be used in the request body and send
 * it on each request. that will achieve authorization
 */
const authentication = (req, res, next) => {
  console.log(req.body.refreshToken);
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
    return res.sendStatus(401);
  }
};

module.exports = { authentication, refreshToken };
