const { Client } = require("redis-om");
const { userDataRepository } = require("../models/RedisRefreshToken");

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

//Refresh token repository indexing for search
await userDataRepository.dropIndex();
await userDataRepository.createIndex();

module.exports = { connectToRedis, redisClient };
