const jwt = require("jsonwebtoken");
const { redisClient, connectToRedis } = require("./redisClient.service");
const { userDataRepository } = require("../models/RedisRefreshToken");
//function to create tokens
const createToken = (username, email, userId, hasExpiry) => {
  const TOKEN = process.env.TOKEN;
  const accessToken = jwt.sign(
    { username: username, email: email, userId: userId, hasExpiry: hasExpiry },
    TOKEN,
    {
      expiresIn: "1d",
      algorithm: "HS256",
    }
  );
  return accessToken;
};

//function to create refresh tokens
const createRefreshToken = (username, email, userId) => {
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

  const refreshToken = jwt.sign(
    { username: username, email: email, userId: userId },
    REFRESH_TOKEN,
    {
      expiresIn: "7d",
      algorithm: "HS256",
    }
  );
  return refreshToken;
};

/**Create a refresh token and set it in the database */
const createRedisRefreshToken = async (refreshTokenData) => {
  const redisUser = await userDataRepository.createAndSave({
    userId: refreshTokenData.userId,
    username: refreshTokenData.username,
    email: refreshTokenData.email,
    refreshToken: refreshTokenData.refreshToken,
  });

  /** Token has expiry date of 7 days inside the database */
  await redisClient.execute([
    "EXPIRE",
    `UserEnitity:${redisUser.entityId}`,
    7 * 24 * 60 * 60,
  ]);
};

/**Check if the redis token exist and if it does, remove it */
const checkRedisRefreshToken = async (userEmail, callbackFunction) => {
  const redisRefreshTokenData = await userDataRepository
    .search()
    .where("email")
    .equalTo(userEmail)
    .returnAll();
  if (redisRefreshTokenData.length > 0) {
    await userDataRepository.remove(redisRefreshTokenData[0].entityId);
  }
};

/**Delete the refresh token from the redis database */
const removeRefreshToken = async (refreshTokenId) => {
  const redisUser = await userDataRepository.remove(refreshTokenId);
  return redisUser;
};

const validateRefreshToken = async (refreshToken, secret) => {
  try {
    const jwtData = jwt.verify(refreshToken, secret);

    return {
      username: jwtData.username,
      email: jwtData.email,
      userId: jwtData.userId,
    };
  } catch (error) {
    return null;
  }
};

const updateRedisRefreshTokensIndex = async () => {
  await userDataRepository.dropIndex();
  await userDataRepository.createIndex();
};

/**Create Remember Token that used in auto login */
const createRememberToken = (userData) => {
  const REMEMBER_TOKEN = process.env.REMEMBER_TOKEN;
  const rememberToken = jwt.sign(
    {
      username: userData.username,
      email: userData.email,
      userId: userData.userId,
    },
    REMEMBER_TOKEN,
    {
      expiresIn: "30d",
      algorithm: "HS256",
    }
  );
  return rememberToken;
};

const removeRememberToken = () => {};

module.exports = {
  createRefreshToken,
  createToken,
  createRememberToken,
  createRedisRefreshToken,
  checkRedisRefreshToken,
  validateRefreshToken,
  removeRefreshToken,
  updateRedisRefreshTokensIndex,
};
