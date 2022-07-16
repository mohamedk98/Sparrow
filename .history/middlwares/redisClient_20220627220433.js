const { Client } = require("redis-om");
const redisUserSchema = require("../models/RedisRefreshToken");

const redisClient = new Client();
redisClient
  .open(process.env.REDIS_HOST)
  .then(() => {
    console.log("Redis Database Connected");
    const userDataRepository = redisClient.fetchRepository(redisUserSchema);
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = redisClient;
