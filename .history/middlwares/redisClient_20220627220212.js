const { Client } = require("redis-om");
const redisUserSchema = require("../models/RedisRefreshToken")
// const redisClient = redis.createClient({
//     url: process.env.REDIS_HOST,
//     password: process.env.REDIS_PASSWORD,
//     name: "tokens",
//   });

const redisClient = new Client();
const userDataRepository = redisClient.fetchRepository(redisUserSchema)
module.exports = redisClient;
