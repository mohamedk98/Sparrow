const { Client } = require("redis-om");
const redisUserSchema = require("../models/RedisRefreshToken");

const redisClient = new Client();
//Connect to redis database
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

//Create a refresh token and set it in the database
const createRedisRefreshToken = async (refreshTokenData) => {
  const userDataRepository = redisClient.fetchRepository(redisUserSchema);

  return userDataRepository
    .createAndSave({
      userId: refreshTokenData.userId,
      username: refreshTokenData.username,
      email: refreshTokenData.email,
      refreshToken: refreshTokenData.refreshToken,
    })
    .then((userRecord) => {
      userDataRepository.expiire(userRecord.entityId,)
    });

  // 604800
};

module.exports = { redisClient, connectToRedis, createRedisRefreshToken };
