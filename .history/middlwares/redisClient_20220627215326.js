
const {Client} = require("redis-om");
// const redisClient = redis.createClient({
//     url: process.env.REDIS_HOST,
//     password: process.env.REDIS_PASSWORD,
//     name: "tokens",
//   });

const redisClient = new Client()

await redisClient.open(process.env.REDIS_HOST)

module.exports =  redisClient