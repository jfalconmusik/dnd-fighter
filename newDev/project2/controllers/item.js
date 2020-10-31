const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Item = require("../server.js").Item;
const itemSeed = require("../models/itemSeed.js");
const router = express.Router();
const bcrypt = require("bcrypt");

//=============================
// Note: Pages must be refreshed for proper items and their counts can be displayed, after some operation.
//=============================

// require('dotenv').config()
const getItem = (req, res, next) => {
  return req.app.get("item");
};
let Item = getItem();
// new product route
router.get("/new", (req, res) => {
  res.render("new.ejs", {
    tabTitle: "Forge Item",
  });
});
// Create method
router.post("/", (req, res) => {
  console.log(req.body);

  let newItem = new Item({
    name: req.body.name,
    type: req.body.type,
    level: req.body.level,
    damage: req.body.damage,
    img: req.body.img,
    cost: req.body.cost,
  });
  //   res.send(req.body);
  Item.create(newItem, (error, createdIten) => {
    if (error) {
      console.log(error);
    } else if (createdItem) {
      console.log(createdItem);
      res.redirect("/item");
    }
  });
});

// show is set up with mongoose
router.get("/:charId/:id", (req, res) => {
  Item.findById(req.params.id, (err, foundItem) => {
    res.render("show.ejs", {
      product: foundItem,
      tabTitle: foundItem.name,
      characterId: req.params.charId,
    });
  });
});

// level up item with mongoose
router.patch("/:charId/:id/:level", (req, res) => {
  let itemId = req.params.id;
  let characterId = req.params.charId;
  Item.findOneAndUpdate(
    { _id: productId },
    {
      level: req.params.level,
    },

    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    }
  );

  res.redirect(`/item/${itemId}`);
});
//
// edit route and methods:
router.get("/:id/edit", (req, res) => {
  Item.findById(req.params.id, (err, foundItem) => {
    res.render("edit.ejs", {
      product: foundItem,
      tabTitle: "Edit Item",
    });
  });
});

router.patch("/:charId/:id/:itemplace/buy", (req, res) => {
  if (req.params.itemPlace == "1") {
    Character.findOneAndUpdate(
      { _id: req.params.charId },
      { item1: { itemId: req.params.id, level: 0 } },
      (err, foundItem) => {
        res.send("item bought.");
      }
    );
  } else {
    Character.findOneAndUpdate(
      { _id: req.params.charId },
      { item2: { itemId: req.params.id, level: 0 } },
      (err, foundItem) => {
        res.send("item bought.");
      }
    );
  }
  res.redirect(`/character/${charId}`);
});

// edit product with mongoose
router.put("/:id", (req, res) => {
  let itemId = req.params.id;

  Item.findOneAndUpdate(
    { _id: itemId },
    {
      name: req.body.name,
      level: req.body.level,
      img: req.body.img,
      damage: req.body.damage,
      cost: req.body.cost,
      type: req.body.type,
    },

    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    }
  );
  res.redirect(`/item/${itemId}`);
});
//

// delete item using mongoose
router.delete("/:id/delete", (req, res) => {
  Item.findOneAndDelete({ _id: req.params.id }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted Log : ", docs);
    }
  });
  res.redirect("/item");
});

// index shows all logs with mongoose
router.get("/:charId", (req, res) => {
  let characterId = req.params.charId;
  console.log(req.session);
  Item.find({}, (error, allItems) =>
    res.render("index.ejs", {
      items: allItems,
      tabTitle: "Ye Olde Item Shop",
      characterId: characterId,
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
  if (bcrypt.compareSync("your guess here", req.session.passwoed)) {
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
