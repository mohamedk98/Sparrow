require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

//Redis Connect
const {
  connectToRedis,
  redisClient,
} = require("./services/redisClient.service");

//Routes
const authenticationRouter = require("./routes/authentication");
const usersRouter = require("./routes/users");
const { refreshToken, authentication } = require("./middlwares/authentication");
const { userDataRepository } = require("./models/RedisRefreshToken");
const connectToMongo = require("./services/mongoClient.service");

//Connection to server and Database URL

const PORT = process.env.PORT || 3000;

//Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "https://zombie-hat.herokuapp.com",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//This will use the built react app as static to be served via server
app.use(express.static(path.join(__dirname, "client/build")));

app.use(authenticationRouter);
app.use(usersRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(authentication);
app.get("/test", authentication, (req, res) => {
  res.send("hello");
});

//Change  "yourDbName" with your database name
//Don't forget to add PORT and MONGOO_URL to .env file

/**
 * Listen to port first before Mongo in order to not fall in heroku
 * timeout error after 60 seconds since it takes more than 60 seconds to connect
 * to the database causing production error on server initialization
 */

app.listen(PORT, async () => {
  console.log(`Server is working on port ${PORT}`);
  await connectToRedis();
  await connectToMongo();
});
