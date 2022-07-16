const { Client } = require("redis-om");
const redisUserSchema = require("../models/RedisRefreshToken");

const redisClient = new Client();
const connectToRedis = async () => {
  await redisClient.open(process.env.REDIS_HOST);
};

const userDataRepository = redisClient.fetchRepository(redisUserSchema);
module.exports = { redisClient, userDataRepository };
