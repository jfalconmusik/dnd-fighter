const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const Character = require("../models/character.js");
// const characterSeed = require("../models/characterSeed.js");
const router = express.Router();
const bcrypt = require("bcrypt");
//=============================
// Note: Pages must be refreshed for proper items and their counts can be displayed, after some operation.
//=============================
// require('dotenv').config()
// new product route
// let Character = router.get("character", (req, res) => {
//   console.log(req, res);
// });
// console.log(Character);
//
router.get("/new", (req, res) => {
  res.render("newCharacter.ejs", {
    tabTitle: "Create Character",
    reset: false,
  });
});
// Create method

router.post("/", (req, res) => {
  Character.findOneAndDelete({ _id: req.body.id }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
    }
  });

  let newCharacter = new Character({
    name: req.body.name,
    backStory: req.body.backStory,
    img: req.body.img,
    agility: req.body.scoreAgi,
    strength: req.body.scoreStr,
    charisma: req.body.scoreCha,
    wisdom: req.body.scoreWis,
    maxHealth: Number(req.body.scoreStr * 10),
    currentHealth: Number(req.body.scoreStr * 10),
    maxMana: Number(req.body.scoreWis * 10),
    currentMana: Number(req.body.scoreWis * 10),
    item1: {
      name: req.body.itemName,
      type: req.body.weaponType,
      level: 0,
      damage: 6,
    },
  });
  //   res.send(req.body);
  let id;
  Character.create(newCharacter, (error, createdCharacter) => {
    if (error) {
      console.log(error);
    } else if (createdCharacter) {
      console.log(createdCharacter);
      id = createdCharacter._id;
      console.log(id);
      // res.redirect(`/character/${createdCharacter._id}`);
    }
  });

  // res.redirect(`/character/`);
});

// show is set up with mongoose

router.get("/:id/versus", (req, res) => {
  Character.find({}, (err, allCharacters) => {
    res.render("index.ejs", {
      characters: allCharacters,
      tabTitle: "Meet the Cast",
      secondCharacter: true,
      firstId: req.params.id,
    });
  });
});
router.get("/:id", (req, res) => {
  Character.findById(req.params.id, (err, foundCharacter) => {
    let title = "For Blood And Glory";
    if (foundCharacter) {
      title = foundCharacter.name;
    }
    res.render("show.ejs", {
      character: foundCharacter,
      tabTitle: title,
      levelup: false,
    });
  });
});
// decrement product with mongoose
// router.patch("/:id/:quant", (req, res) => {
//   let productId = req.params.id;

//   Product.findOneAndUpdate(
//     { _id: productId },
//     {
//       qty: req.params.quant,
//     },

//     (err, docs) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(docs);
//       }
//     }
//   );

//   res.redirect(`/product/${productId}`);
// });
//
// edit route and methods:
// router.get("/:id/respec", (req, res) => {
//   Character.findById(req.params.id, (err, foundCharacter) => {
//     res.render("edit.ejs", {
//       product: foundCharacter,
//       tabTitle: "Respec skill points",
//     });
//   });
// });

// // level up character with mongoose
// router.patch("/:id/:level/:statname/:statlevel", (req, res) => {
//   let characterId = req.params.id;
//   let newLevel = req.params.level;
//   let statLevel = req.params.statLevel;
//   let statName = req.params.statName;
//   if (statName === "agility") {
//     Character.findOneAndUpdate(
//       { _id: characterId },
//       {
//         level: newLevel,
//         agility: statLevel,
//         //   amountBought: req.body.amountBought,
//       },

//       (err, docs) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(docs);
//         }
//       }
//     );
//   } else if (statName === "strength") {
//     Character.findOneAndUpdate(
//       { _id: characterId },
//       {
//         level: newLevel,
//         strength: statLevel,
//         //   amountBought: req.body.amountBought,
//       },

//       (err, docs) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(docs);
//         }
//       }
//     );
//   } else if (statName === "wisdom") {
//     Character.findOneAndUpdate(
//       { _id: characterId },
//       {
//         level: newLevel,
//         wisdom: statLevel,
//         //   amountBought: req.body.amountBought,
//       },

//       (err, docs) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(docs);
//         }
//       }
//     );
//   } else if (statName === "charisma") {
//     Character.findOneAndUpdate(
//       { _id: characterId },
//       {
//         level: newLevel,
//         charisma: statLevel,
//         //   amountBought: req.body.amountBought,
//       },

//       (err, docs) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(docs);
//         }
//       }
//     );
//   }
//   res.redirect(`/character/${characterId}`);
// });
// //

// delete log using mongoose
router.delete("/:id", (req, res) => {
  Character.findOneAndDelete({ _id: req.params.id }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted Log : ", docs);
    }
  });
  res.redirect("/character");
});

router.get("/:id/update", (req, res) => {
  res.render("newCharacter.ejs", {
    tabTitle: "Reset Character",
    reset: true,
    charId: req.params.id,
  });
});

router.post("/:id/update", (req, res) => {
  Character.findOneAndDelete({ _id: req.params.id }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
    }
  });
  console.log("put started");

  let newCharacter = new Character({
    _id: req.params.id,
    name: req.body.name,
    backStory: req.body.backStory,
    img: req.body.img,
    agility: req.body.scoreAgi,
    strength: req.body.scoreStr,
    charisma: req.body.scoreCha,
    wisdom: req.body.scoreWis,
    maxHealth: Number(req.body.scoreStr * 10),
    currentHealth: Number(req.body.scoreStr * 10),
    maxMana: Number(req.body.scoreWis * 10),
    currentMana: Number(req.body.scoreWis * 10),
    item1: {
      name: req.body.itemName,
      type: req.body.weaponType,
      level: 0,
      damage: 6,
    },
  });
  //   res.send(req.body);
  let id;
  Character.create(newCharacter, (error, createdCharacter) => {
    if (error) {
      console.log(error);
    } else if (createdCharacter) {
      console.log(createdCharacter);
      id = createdCharacter._id;
      console.log(id);
      // res.redirect(`/character/${createdCharacter._id}`);
    }
  });
  console.log("put ended");
  res.redirect(`/character/${req.params.id}`);
});

// index shows all logs with mongoos

router.get("/levelup/:id", (req, res) => {
  Character.findById(req.params.id, (err, foundCharacter) => {
    res.render("show.ejs", {
      character: foundCharacter,
      tabTitle: foundCharacter.name,
      levelup: true,
    });
  });
});

router.patch(`/levelup/:id/`, (req, res) => {
  console.log("level up started");
  let plusStrength = 0;
  let plusWisdom = 0;
  let plusCharisma = 0;
  let plusAgility = 0;
  let stat = req.body.statChoice;
  if (stat === "wisdom") {
    plusWisdom = 1;
  } else if (stat === "agility") {
    plusAgility = 1;
  } else if (stat === "charisma") {
    plusCharisma = 1;
  } else if (stat === "strength") {
    plusStrength = 1;
  }
  let item = req.body.itemChoice;
  let ability = req.body.ability;
  let id = req.params.id;
  let itemOne;
  let itemTwo;

  let character;

  Character.findById(req.params.id, (err, foundCharacter) => {
    character = foundCharacter;
    itemOne = foundCharacter.itemOne;
    itemTwo = foundCharacter.itemTwo;
    maxHealth = foundCharacter.maxHealth;
    maxMana = foundCharacter.maxMana;

    if (item === "one") {
      itemOne = {
        name: itemOne.name,
        level: Number(itemOne.level + 1),
        type: itemOne.type,
        damage: itemOne.damage,
      };
    } else if (item === "two") {
      itemOne = {
        name: itemTwo.name,
        level: Number(itemTwo.level + 1),
        type: itemTwo.type,
        damage: itemTwo.damage,
      };
    }

    Character.findOneAndUpdate(
      { _id: id },
      {
        strength: character.strength + plusStrength,
        agility: character.agility + plusAgility,
        wisdom: character.wisdom + plusWisdom,
        charisma: character.charisma + plusCharisma,
        maxHealth: Number(character.strength + plusStrength + maxHealth),
        currentHealth: Number(character.strength + plusStrength + maxHealth),
        maxMana: Number(character.wisdom + plusWisdom + maxMana),
        currentMana: Number(character.wisdom + plusWisdom + maxMana),
        itemOne: itemOne,
        itemTwo: itemTwo,
        level: character.level + 1,
        exp: Number(character.exp - character.level * 10),
      },
      (err, foundCharacter) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated", foundCharacter);
        }
      }
    );
  });

  console.log("level up finished");

  res.redirect(`/character/${id}`);
});

//
//
//
//
//
//
//
//
//
//
//

router.get("/", (req, res) => {
  Character.find({}, (error, allCharacters) =>
    res.render("index.ejs", {
      characters: allCharacters,
      tabTitle: "Meet the Cast",
      secondCharacter: false,
      firstId: "none",
    })
  );
});

router.get("/create-session", (req, res) => {
  res.session.anyProperty = "stored session state.";
  const hashedString = bcrypt.hashSync(
    "your string here",
    bcrypt.genSaltSync(10)
  );
});

router.get("/retrieve-session", (req, res) => {
  if (bcrypt.compareSync("your guess here", req.session.password)) {
    // return result
    console.log("passwords match.");
  }
});
router.get("/update-session", (req, res) => {
  if (req.session.anyProperty) {
    // return result
  }
});

router.get("/destroy-session", (req, res) => {
  if (req.session.anyProperty) {
    // return result
  }
});

module.exports = router;
