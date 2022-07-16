const jwt = require("jsonwebtoken");
const {redisClient} = require("./redisClient.service")
const redisUserSchema = require("../models/RedisRefreshToken");
//function to create tokens
const createToken = (username, email, userId) => {
  const TOKEN = process.env.TOKEN;

  const accessToken = jwt.sign(
    { username: username, email: email, userId: userId },
    TOKEN,
    {
      expiresIn: "15m",
      algorithm: "HS256",
    }
  );
  return accessToken;
};

//function to create tokens
const createRefreshToken = (username, email, userId) => {
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

  const refreshToken = jwt.sign(
    { username: username, email: email, userId: userId },
    REFRESH_TOKEN,
    {
      algorithm: "HS256",
    }
  );
  return refreshToken;
};

//Create a refresh token and set it in the database
const createRedisRefreshToken = async (refreshTokenData) => {
  const userDataRepository = redisClient.fetchRepository(redisUserSchema);
  const redisRefreshToken = await userDataRepository.createAndSave({
    userId: refreshTokenData.userId,
    username: refreshTokenData.username,
    email: refreshTokenData.email,
    refreshToken: refreshTokenData.refreshToken,
  });

  return redisRefreshToken.entityId;

  // 604800
};

module.exports = { createRefreshToken, createToken, createRedisRefreshToken };
