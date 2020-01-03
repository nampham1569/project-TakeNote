const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const authRouter = require("./modules/auth/routes");
const noteRouter = require("./modules/notes/routes");

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};
mongoose
  .connect("mongodb://localhost:27017/takenote-v2", options)
  .catch(err => {
    console.log(err);
  });
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Connect to mongodb success ...");

  // middlewares
  const server = express();
  server.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    // res.header("Access-Control-Allow-Credentials", "true");
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "Origin, X-Requested-With, Content-Type, Accept"
    // );
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, X-Auth-Token"
    );
    next();
  });
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(
    expressSession({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
    })
  );
  // server.use(express.static("public"));

  // routes
  server.use("/api/auth", authRouter);
  server.use("/api/notes", noteRouter);

  //listen
  server.listen(process.env.PORT || 3001, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Server listen on port ${process.env.PORT || 3001}`);
    }
  });
});

connection.on("error", err => {
  console.log(err);
});

connection.on("SIGINT", () => {
  connection.close(() => {
    console.log("server connection closed due to process termination");
  });
});
