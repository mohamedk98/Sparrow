const { Entity, Schema } = require("redis-om");

class UserEnitity extends Entity {}
const redisUserSchema = new Schema(UserEnitity, {
  userId: { type: "string" },
  username: { type: "string" },
  email: { type: "string" },
});

module.exports = redisUserSchema;
