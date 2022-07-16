const { default: mongoose } = require("mongoose");
const { Entity, Schema, Repository } = require("redis-om");
const {
  redisClient,
} = require("../services/redisClient.service");

/**Refresh Token redis schema */
class UserEnitity extends Entity {}
const redisUserSchema = new Schema(
  UserEnitity,
  {
    userId: { type: "string" },
    username: { type: "string" },
    email: { type: "string" },
    refreshToken: { type: "string" },
  },
  { dataStructure: "JSON" }
);
const userDataRepository = new Repository(redisUserSchema, redisClient);

module.exports = {
  redisUserSchema,
  userDataRepository,
};
