const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    backStory: { type: String, required: false },
    level: { type: Number, default: 0 },
    exp: { type: Number, default: 0 },
    gp: { type: Number, default: 50 },
    abilities: [],
    gear: [],
    mana: { type: Number, default: 10 },
    health: { type: Number, default: 10 },
    img: { type: String, required: true },
  },
  { timestamps: true }
);

const Character = mongoose.model("Character", characterSchema);

module.export = Character;
