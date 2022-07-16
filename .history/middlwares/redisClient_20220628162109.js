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

   userDataRepository
    .createEntity({
      userId: refreshTokenData.userId,
      username: refreshTokenData.username,
      email: refreshTokenData.email,
      refreshToken: refreshTokenData.refreshToken,
    })
    .then((recordId) => {
      userDataRepository.save(recordId)
    });
};

module.exports = { redisClient, connectToRedis, createRedisRefreshToken };
