const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Product = require("../models/product.js");
const productSeed = require("../models/seed.js");
const router = express.Router();
const bcrypt = require("bcrypt");

//=============================
// Note: Pages must be refreshed for proper items and their counts can be displayed, after some operation.
//=============================

// require('dotenv').config()

// new product route
router.get("/new", (req, res) => {
  res.render("new.ejs", {
    tabTitle: "Add Product",
  });
});
// Create method
router.post("/", (req, res) => {
  console.log(req.body);

  let newProduct = new Product({
    name: req.body.name,

    description: req.body.description,
    price: req.body.price,
    qty: req.body.qty,
    img: req.body.img,
  });
  //   res.send(req.body);
  Product.create(newProduct, (error, createdProduct) => {
    if (error) {
      console.log(error);
    } else if (createdProduct) {
      console.log(createdProduct);
      res.redirect("/product");
    }
  });
});

// show is set up with mongoose
router.get("/:id", (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render("show.ejs", {
      product: foundProduct,
      tabTitle: foundProduct.name,
    });
  });
});

// decrement product with mongoose
router.patch("/:id/:quant", (req, res) => {
  let productId = req.params.id;

  Product.findOneAndUpdate(
    { _id: productId },
    {
      qty: req.params.quant,
    },

    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    }
  );

  res.redirect(`/product/${productId}`);
});
//
// edit route and methods:
router.get("/:id/edit", (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render("edit.ejs", {
      product: foundProduct,
      tabTitle: "Edit",
    });
  });
});

// edit product with mongoose
router.put("/:id", (req, res) => {
  let productId = req.params.id;

  Product.findOneAndUpdate(
    { _id: productId },
    {
      qty: req.body.qty,
      name: req.body.name,
      description: req.body.description,
      img: req.body.img,

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
  res.redirect(`/product/${productId}`);
});
//

// delete log using mongoose
router.delete("/:id", (req, res) => {
  Product.findOneAndDelete({ _id: req.params.id }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted Log : ", docs);
    }
  });
  res.redirect("/product");
});

// index shows all logs with mongoose
router.get("/", (req, res) => {
  console.log(req.session);
  Product.find({}, (error, allProducts) =>
    res.render("index.ejs", {
      products: allProducts,
      tabTitle: "Welcome Home",
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
