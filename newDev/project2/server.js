require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Character = require("./models/character.js");
const characterSeed = require("./models/characterSeed.js");
const app = express();
const session = require("express-sessions");
const bcrypt = require("bcrypt");
mongoose.Promise = global.Promise;
const db = mongoose.connection;
const mongoURI = process.env.MONGODBURI;
const PORT = process.env.PORT;

// Connect to Mongo
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("The connection with mongod is established");
  }
);

// Character.deleteMany({}, (err, deleted) => {
//   if (err) {
//     console.log(err);
//   }
// });
// Seed command:
Character.create(characterSeed, (err, data) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("added initial products.");
  }
});

// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", mongoURI));
db.on("disconnected", () => console.log("mongo disconnected"));

const characterController = require("./controllers/Character.js");
// Product.create(productSeed, (err, data) => {
//   if (err) console.log(err.message);
//   console.log("added initial products");
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/character", characterController);
app.use("/item", itemController);
app.use("/fight", fightController);

app.listen(PORT, () => {
  console.log(`Listening on`, PORT);
});
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
