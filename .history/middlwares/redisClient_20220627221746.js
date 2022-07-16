const { Client } = require("redis-om");
const redisUserSchema = require("../models/RedisRefreshToken");

const redisClient = new Client();
const connectToRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient
      .open(process.env.REDIS_HOST)
      .then(() => {
        console.log("Redis Database Connected");
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const createRedisRefreshToken = async (refreshTokenData) => {

    const userDataRepository = redisClient.fetchRepository(redisUserSchema);
    return userDataRepository.createAndSave({
      userId: refreshTokenData.userId,
      username: refreshTokenData.username,
      email: refreshTokenData.email,
      refreshToken: refreshTokenData.refreshToken,
    });

};

module.exports = { redisClient, connectToRedis, createRedisRefreshToken };
