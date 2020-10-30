const mongoose = require("mongoose");

// allowed item types are melee, ranged, sorcery

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    level: { type: Number, default: 0 },
    damage: { type: Number, default: 0 },
    attacksPerRound: { type: Number, default: 1 },
    cost: { type: Number, default: 50 },
    img: { type: String, required: true },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

module.export = Item;
