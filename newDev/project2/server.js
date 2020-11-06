require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
// const Character = require("./models/characterSchema.js");
// const Item = require("./models/itemSchema.js");
const characterSeed = require("./models/characterSeed.js");
const itemSeed = require("./models/itemSeed.js");
const app = express();
const session = require("express-session");
const bcrypt = require("bcrypt");
mongoose.Promise = global.Promise;
const db = mongoose.connection;
const mongoURI = process.env.MONGODBURI_CHAR;
const mongoURIitems = process.env.MONGODBURI_ITEM;
const PORT = process.env.PORT;

// Connect to Mongo
// currently trying to run multiple databases. Mistake? Consider.
const Character = require("./models/character");

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("The connection with mongod is established");
  }
);
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", mongoURI));
db.on("disconnected", () => console.log("mongo disconnected"));
//
Character.init();
// Character.deleteMany({}, (err, deleted) => {
//   if (err) {
//     console.log(err);
//   }
// });
// Seed command:

// Item.init();
// Error / success

// Character.create(characterSeed, (err, data) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log("added initial characters.");
//   }
// });

const characterController = require("./controllers/character.js");
const battleController = require("./controllers/battle.js");
const victoryController = require("./controllers/victory.js");
// Product.create(productSeed, (err, data) => {
//   if (err) console.log(err.message);
//   console.log("added initial products");
// });
// console.log(Character);
// console.log(Item);
// app.set("ch", Character);
// app.set("i", Item);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// app.get("/character", (req, res) => {
//   res.send({ Character });
// });
// //
// app.use("/item", itemController);
// app.get("/item", (req, res) => {
//   res.send({ Item });
// });
app.use("/character", characterController);
app.use("/battle", battleController);
app.use("/victory", victoryController);

app.get("/", (req, res) => {
  res.render("welcome.ejs");
});

app.listen(PORT, () => {
  console.log(`Listening on`, PORT);
});

// ======================================
// To Do:
// ======================================

// ==== NEXT: ====

// Respec <---- Can Remove ---->

// Shop.

// Random NPC gen.
// random npcs will have a different tag in mongo.

// Abilities.

// Rules page.

// Sudden death?

// Sprites?

// Make sure the only seed images are small. Deploy to heroku. And then do the outcomes work.
