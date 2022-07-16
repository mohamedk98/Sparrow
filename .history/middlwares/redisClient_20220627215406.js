const { Client } = require("redis-om");
// const redisClient = redis.createClient({
//     url: process.env.REDIS_HOST,
//     password: process.env.REDIS_PASSWORD,
//     name: "tokens",
//   });

const redisClient = new Client();

redisClient
  .open(process.env.REDIS_HOST)
  .then(() => {
    console.log("Redis work");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = redisClient;
