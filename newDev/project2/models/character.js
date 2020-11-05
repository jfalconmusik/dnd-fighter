const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    backStory: { type: String, default: "Generic NPC." },
    level: { type: Number, default: 0 },
    exp: { type: Number, default: 0 },
    gp: { type: Number, default: 50 },
    abilities: [],
    item1: {
      type: Object,
      default: {},
    },
    item2: {
      type: Object,
      default: {},
    },
    maxMana: { type: Number, default: 100 },
    maxHealth: { type: Number, default: 100 },
    currentMana: { type: Number, default: 100 },
    currentHealth: { type: Number, default: 100 },
    wisdom: { type: Number, default: 10 },
    agility: { type: Number, default: 10 },
    strength: { type: Number, default: 10 },
    charisma: { type: Number, default: 10 },
    img: { type: String, required: true },
  },
  { timestamps: true }
);

const Character = mongoose.model("Character", characterSchema);
// export switched from Character to characterSchema because multiple databases.
module.exports = Character;
