const jwt = require("jsonwebtoken");

/**
 * a middleware to handle authentcation and authorization:
 * if the request cookies contain access_token cookies then
 * verify the hash itself and store the username and role of the user
 * or whatever the data that will be used in the request body and send
 * it on each request. that will achieve authorization
 */

 const token = (req,res,next) =>{
const refreshToken = req.body.refreshToken
const refreshTokenId = req.body.
}




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

//function to create tokens
const createToken = (username, email, userId) => {
  const TOKEN = process.env.TOKEN;

  const accessToken = jwt.sign(
    { username: username, email: email, userId: userId },
    TOKEN,
    {
      expiresIn: "15m",
      algorithm: "HS256",
    }
  );
  return accessToken;
};

//function to create tokens
const createRefreshToken = (username, email, userId) => {
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

  const refreshToken = jwt.sign(
    { username: username, email: email, userId: userId },
    REFRESH_TOKEN,
    {
      algorithm: "HS256",
    }
  );
  return refreshToken;
};
exports.authentication = authentication;
exports.createToken = createToken;
exports.createRefreshToken = createRefreshToken;
