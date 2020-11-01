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
const mongoURIcharacters = process.env.MONGODBURI_CHAR;
const mongoURIitems = process.env.MONGODBURI_ITEM;
const PORT = process.env.PORT;

// Connect to Mongo
// currently trying to run multiple databases. Mistake? Consider.
const chardb = mongoose.createConnection(
  mongoURIcharacters,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("The connection with mongod is established for characters");
  }
);

const Character = chardb.model(
  "Character",
  require("./models/characterSchema")
);

const itemdb = mongoose.createConnection(
  mongoURIitems,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("The connection with mongod is established for items");
  }
);

const Item = itemdb.model("Item", require("./models/itemSchema"));

db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", mongoURI));
db.on("disconnected", () => console.log("mongo disconnected"));
// Character.deleteMany({}, (err, deleted) => {
//   if (err) {
//     console.log(err);
//   }
// });
// Seed command:

Character.init();
Item.init();
// Error / success

// Character.create(characterSeed, (err, data) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log("added initial characters.");
//   }
// });
// Item.create(itemSeed, (err, data) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log("added initial items.");
//   }
// });

const characterController = require("./controllers/character.js");
// const battleController = require("./controllers/battle.js");
const itemController = require("./controllers/item.js");
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

app.use("/character", characterController);
// app.get("/character", (req, res) => {
//   res.send({ Character });
// });
// //
app.use("/item", itemController);
// app.get("/item", (req, res) => {
//   res.send({ Item });
// });
// app.use("/battle", battleController);

app.get("/", (req, res) => {
  res.render("welcome.ejs");
});

app.listen(PORT, () => {
  console.log(`Listening on`, PORT);
});

// ======================================
// To Do:
// ======================================

// Make both character and item available either globally or in multiple places.

// Customize the different Update views, like respec and shop.

// must select character and enter shop as that character.

// Create a fight mechanic, followed by a level up mechanic.

// Make sure all of this actually works by creating seeds.

// Random NPC gen.
