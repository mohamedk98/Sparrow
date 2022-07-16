
const redis = require("redis");
const redisClient = redis.createClient({
    url: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    name: "tokens",
  });

  export default redisClient