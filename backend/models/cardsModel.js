const mongoose = require("mongoose");

const cardsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "A card must have a name"],
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    required: [true, "A card must have a category"],
  },
  cardsCollection: {
    type: String,
    required: [true, "A card must have a collection"],
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
    required: [true, "A card must have a image"],
  },
  images: [String],
  cteatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Card = mongoose.model("Card", cardsSchema);

module.exports = Card;
