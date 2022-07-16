const { Client } = require("redis-om");
const redisUserSchema = require("../models/RedisRefreshToken");

const redisClient = new Client();
redisClient
  .open(process.env.REDIS_HOST)
  .then(() => {
    console.log("Redis Database Connected");

  })
  .catch((error) => {
    console.log(error);
  });
  const userDataRepository = redisClient.fetchRepository(redisUserSchema);
module.exports = {redisClient,userDataRepository};
