const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    backStory: { type: String, default: "Generic NPC." },
    level: { type: Number, default: 0 },
    exp: { type: Number, default: 0 },
    gp: { type: Number, default: 50 },
    abilities: [],
    gear: [],
    mana: { type: Number, default: 10 },
    health: { type: Number, default: 10 },
    wisdom: { type: Number, default: 10 },
    agility: { type: Number, default: 10 },
    strength: { type: Number, default: 10 },
    charisma: { type: Number, default: 10 },
    sign: { type: String, required: True },
    img: { type: String, required: true },
  },
  { timestamps: true }
);

const Character = mongoose.model("Character", characterSchema);

module.export = Character;
