const { Entity, Schema,Repository } = require("redis-om");
const { redisClient, connectToRedis } = require("../services/redisClient.service");

class UserEnitity extends Entity {}
const redisUserSchema = new Schema(
  UserEnitity,
  {
    userId: { type: "string", indexed: true },
    username: { type: "string" },
    email: { type: "string" },
    refreshToken: { type: "string" },
  },
  { dataStructure: "JSON" }
);

const userDataRepository = new Repository(redisUserSchema,redisClient)
connectToRedis().then(()=>{
  // if ()
  // userDataRepository.createIndex()
})


module.exports = {redisUserSchema,userDataRepository};
