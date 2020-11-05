const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const Character = require("../models/character.js");
// const characterSeed = require("../models/characterSeed.js");
const router = express.Router();

router.patch("/", (req, res) => {
  // the characters may be identified by the opposing number to the one they are given in the battle screen.
  // for post requests, the winner will always be called id1.
  console.log("victory function started");
  let char1;
  let char2;
  Character.findById(req.body.victor, (err, foundCharacter) => {
    char1 = foundCharacter;

    Character.findById(req.body.loser, (err, foundCharacter) => {
      char2 = foundCharacter;

      let expGained = Number(char2.level * 8);

      let char1exp = Number(char1.exp + expGained);
      let char2exp = 0;

      let char1health = req.body.victorHealth + Number(char1.maxHealth * 0.3);

      if (char1health > char1.maxHealth) {
        char1health = char1.maxHealth;
      }

      let char2health = char2.maxHealth;

      let goldGained = req.body.gold;
      let totalGold = goldGained + char1.gp;

      Character.findOneAndUpdate(
        { _id: req.body.victor },
        { currentHealth: char1health, exp: char1exp, gp: totalGold },
        (err, docs) => {
          if (err) {
            console.log(err);
          } else {
            console.log(docs);
          }
        }
      );
      Character.findOneAndUpdate(
        { _id: req.body.loser },
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
      console.log("victory function completed");
      // If winner has enough exp to level, res redirect to level up screen. Otherwise, redirect to standard victory screen.
      res.redirect(
        `/victory/${req.body.victor}/${req.body.loser}/${goldGained}`
      );
    });
  });
});

router.get("/:id1/:id2", (req, res) => {
  Character.findById(req.params.id1, (err, foundCharacter) => {
    let character1 = foundCharacter;

    return Character.findById(req.params.id2, (err, foundCharacter) => {
      let character2 = foundCharacter;

      return res.render("victory.ejs", {
        characterOne: character1,
        characterTwo: character2,
        goldGained: req.body.gold,
        mutual: false,
      });
    });
  });
});

router.get("/", (req, res) => {
  Character.findById(req.body.victor, (err, foundCharacter) => {
    let character1 = foundCharacter;

    return Character.findById(req.body.loser, (err, foundCharacter) => {
      let character2 = foundCharacter;

      return res.render("victory.ejs", {
        characterOne: character1,
        characterTwo: character2,
        goldGained: req.body.gold,
        mutual: false,
      });
    });
  });
});

router.patch("/mutually-assured-destruction/:id1/:id2", (req, res) => {
  // {charOne: charOneId, charTwo: charTwoId, player2GoldGen, player1GoldGen},
  let character1;
  let character2;
  // get first char info
  Character.findById(req.params.id1, (err, foundCharacter) => {
    character1 = foundCharacter;

    // get second char info
    Character.findById(req.params.id2, (err, foundCharacter) => {
      character2 = foundCharacter;

      // update first char
      Character.findOneAndUpdate(
        { _id: req.body.charOne },
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
      // update second char
      Character.findOneAndUpdate(
        { _id: req.body.charTwo },
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
      // get first char again
      Character.findById(req.params.id1, (err, foundCharacter) => {
        character1 = foundCharacter;

        // get second again
        Character.findById(req.params.id2, (err, foundCharacter) => {
          character2 = foundCharacter;

          // give page.
          res.render("victory.ejs", {
            characterOne: character1,
            characterTwo: character2,
            goldGained: 0,
            mutual: true,
          });
        });
      });
    });
  });
});

module.exports = router;
