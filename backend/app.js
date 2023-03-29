const express = require("express"); //import module express
const bodyParser = require("body-parser"); //import module body-parser
const mongoose = require("mongoose"); //import module mongoose
const cors = require("cors")

// creation Applic express
const app = express();
const path = require("path");

app.use(cors())

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/dingo");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/images", express.static(path.join("backend/images")));


// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
  });
  let UserRouter=require("../backend/routes/user")
  let PlatsRouter=require("./routes/plat")
  let ChefsRouter=require("./routes/chef")
  let tableRouter=require("./routes/table")
  
  app.use("/api",UserRouter)
  app.use("/plat",PlatsRouter)
  app.use("/chef",ChefsRouter)
  app.use("/table",tableRouter)

  module.exports = app;