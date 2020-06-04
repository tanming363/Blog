const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

mongoose.connect("mongodb://localhost:27017/Udemy",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
  .then(() => {
    console.log("Connected successfully !")
  })
  .catch(() => {
    console.log("Connected failed !")
  })

// mongoose.connect(
//   "mongodb+srv://tanming363:" + process.env.MONGO_ATLAS_PW + "@cluster0-geitk.mongodb.net/udemy",
//   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, }
// )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
