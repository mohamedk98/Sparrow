const jwt = require("jsonwebtoken");
const { redisClient, connectToRedis } = require("./redisClient.service");
const { userDataRepository } = require("../models/RedisRefreshToken");
//function to create tokens
const createToken = (username, email, userId) => {
  const TOKEN = process.env.TOKEN;
  const accessToken = jwt.sign(
    { username: username, email: email, userId: userId },
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

//Create a refresh token and set it in the database
const createRedisRefreshToken = async (refreshTokenData) => {
  const redisRefreshToken = await userDataRepository.createAndSave({
    userId: refreshTokenData.userId,
    username: refreshTokenData.username,
    email: refreshTokenData.email,
    refreshToken: refreshTokenData.refreshToken,
  });

  // 604800
};

const checkRedisRefreshToken = async (userEmail) => {
  const redisRefreshTokenData = await userDataRepository
    .search()
    .where("email")
    .equalTo(userEmail)
    .returnAll();

    return redisRefreshTokenData
};

const removeRefreshToken = async (refreshTokenId) => {
  const redisUser = await userDataRepository.remove(refreshTokenId);
  return redisUser;
};

const validateRefreshToken = async (refreshToken, secret) => {
  try {
    const jwtData = jwt.verify(refreshToken, secret);

    return {
      refreshToken: jwtData.refreshToken,
      refreshTokenId: jwtData.refreshTokenId,
      hasExpiry: jwtData.hasExpiry,
    };
  } catch (error) {
    return null;
  }
};
module.exports = {
  createRefreshToken,
  createToken,
  createRedisRefreshToken,
  checkRedisRefreshToken,
  validateRefreshToken,
  removeRefreshToken,
};
