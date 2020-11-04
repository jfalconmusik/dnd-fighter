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
  });
});
// Create method

router.post("/", (req, res) => {
  let newCharacter = new Character({
    name: req.body.name,
    backStory: req.body.backStory,
    img: req.body.img,
    sign: req.body.sign,
  });
  //   res.send(req.body);
  Character.create(newCharacter, (error, createdCharacter) => {
    if (error) {
      console.log(error);
    } else if (createdCharacter) {
      console.log(createdCharacter);
      res.redirect("/character");
    }
  });
});

// show is set up with mongoose
router.get("/:id", (req, res) => {
  Character.findById(req.params.id, (err, foundCharacter) => {
    res.render("show.ejs", {
      character: foundCharacter,
      tabTitle: foundCharacter.name,
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
router.get("/:id/respec", (req, res) => {
  Character.findById(req.params.id, (err, foundCharacter) => {
    res.render("edit.ejs", {
      product: foundCharacter,
      tabTitle: "Respec skill points",
    });
  });
});

// level up character with mongoose
router.patch("/:id/:level/:statname/:statlevel", (req, res) => {
  let characterId = req.params.id;
  let newLevel = req.params.level;
  let statLevel = req.params.statLevel;
  let statName = req.params.statName;
  if (statName === "agility") {
    Character.findOneAndUpdate(
      { _id: characterId },
      {
        level: newLevel,
        agility: statLevel,
        //   amountBought: req.body.amountBought,
      },

      (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
        }
      }
    );
  } else if (statName === "strength") {
    Character.findOneAndUpdate(
      { _id: characterId },
      {
        level: newLevel,
        strength: statLevel,
        //   amountBought: req.body.amountBought,
      },

      (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
        }
      }
    );
  } else if (statName === "wisdom") {
    Character.findOneAndUpdate(
      { _id: characterId },
      {
        level: newLevel,
        wisdom: statLevel,
        //   amountBought: req.body.amountBought,
      },

      (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
        }
      }
    );
  } else if (statName === "charisma") {
    Character.findOneAndUpdate(
      { _id: characterId },
      {
        level: newLevel,
        charisma: statLevel,
        //   amountBought: req.body.amountBought,
      },

      (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
        }
      }
    );
  }
  res.redirect(`/character/${characterId}`);
});
//

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

// index shows all logs with mongoose
router.get("/", (req, res) => {
  console.log(req.session);

  Character.find({}, (error, allCharacters) =>
    res.render("index.ejs", {
      characters: allCharacters,
      tabTitle: "Meet the Cast",
    })
  );
});

router.get("/levelup/:id", (req, res) => {
  Character.findById(req.params.id, (err, foundCharacter) => {
    res.render("show.ejs", {
      character: foundCharacter,
      tabTitle: foundCharacter.name,
      levelup: true,
    });
  });
});

router.patch(`/character/levelup/:id/:stat/:item/:ability`, (req, res) => {
  let plusStrength = 0;
  let plusWisdom = 0;
  let plusCharisma = 0;
  let plusAgility = 0;
  let ability = req.params.ability;
  if (ability === "wisdom") {
    plusWisdom = 1;
  } else if (ability === "agility") {
    plusAgility = 1;
  } else if (ability === "charisma") {
    plusCharisma = 1;
  } else if (ability === "strength") {
    plusStrength = 1;
  }
  let item = req.params.item;
  let stat = req.params.stat;
  let id = req.params.id;
  let itemOne;
  let itemTwo;

  let character;

  Character.findById(req.params.id, (err, foundCharacter) => {
    character = foundCharacter;
    itemOne = foundCharacter.itemOne;
    itemTwo = foundCharacter.itemTwo;
  });

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
      itemOne: itemOne,
      itemTwo: itemTwo,
      level: character.level + 1,
      exp: Number(character.exp - (character.level + 1) * 10),
    },
    (err, foundCharacter) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated", foundCharacter);
      }
    }
  );

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
