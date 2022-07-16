const jwt = require("jsonwebtoken");
const {redisClient} = require("../services/redisClient.service")
const {redisClient} = require("../services/token.service")
/**
 * a middleware to handle authentcation and authorization:
 * if the request cookies contain access_token cookies then
 * verify the hash itself and store the username and role of the user
 * or whatever the data that will be used in the request body and send
 * it on each request. that will achieve authorization
 */

const token = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  const refreshTokenId = req.body.refreshTokenId;
  const userCredentials =  jwt.verify(refreshToken,prcoess.env.REFRESH_TOKEN)

  if (!refreshToken || !refreshTokenId || userCredentials == null) {
    return  res.sendStatus(401)
 
  }

  if ()
  


};

const authentication = (req, res, next) => {
  const userToken = req.cookies.access_token;
  const TOKEN = process.env.TOKEN;
  if (!userToken) {
    return res.sendStatus(403);
  }

  try {
    const data = jwt.verify(userToken, TOKEN);
    req.userId = data.userId;
    req.email = data.email;
    req.username = data.username;
    next();
  } catch {
    return res.sendStatus(403);
  }
};

module.exports = {authentication,token}
