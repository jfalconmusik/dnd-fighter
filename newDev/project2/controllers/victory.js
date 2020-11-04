const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const Character = require("../models/character.js");
// const characterSeed = require("../models/characterSeed.js");
const router = express.Router();

router.patch("/:id1/:id2", (req, res) => {
  // the characters may be identified by the opposing number to the one they are given in the battle screen.
  // for post requests, the winner will always be called id1.

  let char1;
  let char2;
  Character.findById(req.params.id1, (err, foundCharacter) => {
    char1 = foundCharacter;
  });

  Character.findById(req.params.id2, (err, foundCharacter) => {
    char2 = foundCharacter;
  });

  let expGained = Number(char2.level * 8);

  let char1exp = Number(char1.exp + expGained);
  let char2exp = 0;

  let char1health = char1.currentHealth + Number(char1.maxHealth * 0.3);

  if (char1health > char1.maxHealth) {
    char1health = char1.maxHealth;
  }

  let char2health = char2.maxHealth;

  Character.findOneAndUpdate(
    { _id: req.params.id1 },
    { currentHealth: char1health, exp: char1exp },
    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    }
  );
  Character.findOneAndUpdate(
    { _id: req.params.id2 },
    { currentHealth: char2health, exp: char2exp },
    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    }
  );

  // winner gets more exp, loser loses all exp gained since last level. Winner regains a third of health, loser is healed completely.

  // If winner has enough exp to level, res redirect to level up screen. Otherwise, redirect to standard victory screen.
  res.redirect(`/victory/${req.params.id1}/${req.params.id2}`);
});

router.get("/:id1:/id2", (req, res) => {
  Character.findById(req.params.id1, (err, foundCharacter) => {
    character1 = foundCharacter;
  });

  Character.findById(req.params.id2, (err, foundCharacter) => {
    character2 = foundCharacter;
  });

  res.render("victory.ejs", {
    characterOne: character1,
    characterTwo: character2,
    mutual: false,
  });
});

router.get("/mutually-assured-destruction/:id1:/id2", (req, res) => {
  let character1;
  let character2;
  Character.findById(req.params.id1, (err, foundCharacter) => {
    character1 = foundCharacter;
  });

  Character.findById(req.params.id2, (err, foundCharacter) => {
    character2 = foundCharacter;
  });

  Character.findOneAndUpdate(
    { _id: req.params.id1 },
    {
      currentHealth: Number(character1.maxHealth * 0.5),
      exp: Number(character1.exp + character2.level * 4),
    },
    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    }
  );
  Character.findOneAndUpdate(
    { _id: req.params.id2 },
    {
      currentHealth: Number(character2.maxHealth * 0.5),
      exp: Number(character2.exp + character1.level * 4),
    },
    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    }
  );

  Character.findById(req.params.id1, (err, foundCharacter) => {
    character1 = foundCharacter;
  });

  Character.findById(req.params.id2, (err, foundCharacter) => {
    character2 = foundCharacter;
  });

  res.render("victory.ejs", {
    characterOne: character1,
    characterTwo: character2,
    mutual: true,
  });
});
