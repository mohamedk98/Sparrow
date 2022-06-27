const jwt = require("jsonwebtoken");

/**
 * a middleware to handle authentcation and authorization:
 * if the request cookies contain access_token cookies then
 * verify the hash itself and store the username and role of the user
 * or whatever the data that will be used in the request body and send
 * it on each request. that will achieve authorization
 */
const authentication = (req, res, next) => {
  const userToken = req.cookies.access_token;
  const TOKEN = process.env.TOKEN;
  console.log(userToken)
  if (!userToken) {
    return res.sendStatus(403);
  }

  try {
    const data = jwt.verify(userToken, TOKEN);
    req.username = data.username;
    req.email = data.email;
    next();
  } catch {
    return res.sendStatus(403);
  }
};

//function to create tokens
const createToken = (username, email) => {
  const TOKEN = process.env.TOKEN;

  const accessToken = jwt.sign({ username: username, email: email }, TOKEN,{expiresIn:"2h"});
  return accessToken

};

exports.authentication = authentication;
exports.createToken = createToken;
