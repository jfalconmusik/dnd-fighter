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
// Character.deleteMany({}, (err, deleted) => {
//   if (err) {
//     console.log(err);
//   }
// });
// // Seed command:

Character.init();
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

// =============== <Fight> ==============
//

// 1 v 1. On each turn, player has these options: Attack, Defend, Special Ability, Attempt to Flee (mana and health do not recover between fights. Opponent can choose
// to allow the flee, or choose to pursue. There will be a roll)), Inventory.
// A player can do two of the above actions per turn, except for special ability, which takes up the entire turn.

// Stats are: Mana, used for special abilities or magic items. Health, for health. Agility for Defense and Flee. Strength for Attack with physical weapons. Wisdom with magic weapons
// and special abilities.

// Attack: Character roles their stat plus rand versus opposing defense.

// ============== </Fight> ==============

// ==== NEXT: ====

// After a fight, the victors heal somewhat. The losers are healed completely, but lose all experience gained since their last level. Winners gain xp based on the level of their opponent.
// 10 * level exp is required to level up. exp is gained at a rate of 8 * opponentLevel.

// Level Up.

// Respec

// Shop.

// Random NPC gen.
// random npcs will have a different tag in mongo.

// Abilities + Signs.

// Rules page.

// Sudden death?

// Sprites?
