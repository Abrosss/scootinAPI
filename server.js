const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require('fs');
const apiRoutes = require("./routes/api");
const mainRoutes = require("./routes/main");
const connectDB = require("./config/database");
const passport = require("passport")
const flash = require('express-flash')
const session = require('express-session')
const cors = require('cors')
app.use(flash());
app.use(
  cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
}))

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

//Static Folder
app.use(express.static("public"));
connectDB()
//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(session({
  // store: new FileStore(fileStoreOptions),
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly:true,
    maxAge: 3600000
  }
}))
app.use((req, res, next) => {
  console.log(req.session);
  next()
})
//Setup Routes For Which The Server Is Listening
require('./config/passport')(passport)
      app.use(passport.initialize())
      app.use(passport.session())
      app.use(function(req, res, next){
          res.locals.user = req.user || null
          next();
        })
const requireAuth = (req, res, next) => {
  const {user} = req.session;
  if(!user) {
    return res.status(401).json({message: "Unauthorized"})
  }
  next()
}
app.use("/api", apiRoutes);
app.use("/", mainRoutes);
//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
