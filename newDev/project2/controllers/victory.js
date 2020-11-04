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

  let expGained = Number(char2.level * 10);

  let char1exp = Number(char1.exp + expGained);
  let char2exp = 0;

  let char1health = char1.currentHealth + Number(char1.maxHealth * 0.3);

  if (char1health > char1.maxHealth) {
    char1health = char1.maxHealth;
  }

  let char2health = char2.maxHealth;

  Character.findOneAndUpdate(
    { _id: req.params.id1 },
    { currentHealth: char1health },
    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log(docs.rating);
      }
    }
  );

  // winner gets more exp, loser loses all exp gained since last level. Winner regains a third of health, loser is healed completely.

  // If winner has enough exp to level, res redirect to level up screen. Otherwise, redirect to standard victory screen.
});
