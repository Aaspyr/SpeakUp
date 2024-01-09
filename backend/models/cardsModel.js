const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const cardsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "A card must have a name"],
    unique: true,
    trim: true,
    maxLength: [20, "A card name must have maximum 20 characters"],
    minLength: [1, "A card name must have at least character"],
  },
  cardsCollection: {
    type: String,
    required: [true, "A card must have a collection"],
    maxLength: [20, "A card name must have maximum 20 characters"],
    minLength: [1, "A card name must have at least character"],
  },
  favourites: {
    type: Boolean,
  },
  descryption: {
    type: String,
    trim: true,
  },
  imageCard: {
    type: String,
    required: [true, "A card must have a image"],
  },
  imageCollection: {
    type: String,
  },
  cteatedAt: {
    type: Date,
    default: Date.now(),
  },
});

cardsSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Card = mongoose.model("Card", cardsSchema);

module.exports = Card;
