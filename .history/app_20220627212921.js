require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const { authentication } = require("./middlwares/authentication");
const app = express();

//Redis Connect
const redisClient = require("./middlwares/redisClient");

//Routes
const authenticationRouter = require("./routes/authentication");
const usersRouter = require("./routes/users");

//Connection to server and Database URL
const MONGOO_URL = process.env.MONGOO_URL;
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

//testing authneitcation route
app.get("/getKeys", (req, res) => {
  const refreshToken = req.body.refreshToken
  redisClient.get("email").then((data) => {
    let newData = data
    console.log(newData)
    // redisClient.set("refreshToken", null).then(() => {
      res.send({ message: "Successfully logged out 😏 🍀" });
    // });
  });
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
