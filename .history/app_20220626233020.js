require("dotenv").config();

const express = require("express");
const crypto = require("crypto");
const path = require("path");
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const redis = require("redis");
const { authentication } = require("./middlwares/authentication");
const app = express();

//Redis Connect
let redisClient = redis.createClient({
  url: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  name: "tokens",
});

//Routes
const authenticationRouter = require("./routes/authentication");
const usersRouter = require("./routes/users");

//Connection to server and Database URL
const MONGOO_URL = process.env.MONGOO_URL;
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//This will use the built react app as static to be served via server
app.use(express.static(path.join(__dirname, "client/build")));

app.use(authenticationRouter);

app.get("/", (req, res) => {
  res.send("hello");
  console.log(req.username,req.email,req.userId)
});

//testing authneitcation route
app.get("/books", authentication, (req, res) => {
  res.send("you are authenticated");
});

//Change  "yourDbName" with your database name
//Don't forget to add PORT and MONGOO_URL to .env file

/**
 * Listen to port first before Mongo in order to not fall in heroku
 * timeout error after 60 seconds since it takes more than 60 seconds to connect
 * to the database causing production error on server initialization
 */

app.listen(PORT, () => {
  console.log(`Server is working on port ${PORT}`);
  mongoose
    .connect(MONGOO_URL, { dbName: "yourDbName" })
    .then(() => {
      console.log("Connected Successfully to the Database");
      redisClient.connect().then(() => {
        console.log("Connected to Redis Cache");
      });
    })
    .catch((error) => console.log(error));
});
