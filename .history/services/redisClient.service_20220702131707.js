const { Client } = require("redis-om");


const redisClient = new Client();
//Connect to redis database
const connectToRedis = async () => {
  console.log(redisClient.isOpen)
  if (!redisClient.) {
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

module.exports = {connectToRedis,redisClient}