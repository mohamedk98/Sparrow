require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
//Swagger Options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zombie-hat Social Media App",
      version: "1.0.0",
      description: "A social media app made for youth",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./documentation/*.yaml"],
};

const specs = swaggerJsdoc(options);
//Swagger initilization
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs,{explorer:true}));


//Redis Connect
const { connectToRedis } = require("./services/redisClient.service");

//Routes
const authenticationRouter = require("./routes/authentication");
const usersRouter = require("./routes/users");
const postsRouter = require ("./routes/posts")
const commentsRouter = require ("./routes/comments")
const { authorization } = require("./middlwares/authentication");
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
app.use(morgan("dev"));
app.use(authenticationRouter);
app.use(usersRouter);


app.get("/", (req, res) => {
  res.send("hello");
});



app.use(authorization);
app.use('/comments',commentsRouter)
app.use('/posts',postsRouter)


//Change  "yourDbName" with your database name
//Don't forget to add PORT and MONGOO_URL to .env file

/**
 * Listen to port first before Mongo in order to not fall in heroku
 * timeout error after 60 seconds since it takes more than 60 seconds to connect
 * to the database causing production error on server initialization
 */

app.listen(PORT, process.env.HOST || "172.31.83.73",async () => {
  console.log(`Server is working on port ${PORT}`);
  await connectToRedis();
  await connectToMongo();
});
