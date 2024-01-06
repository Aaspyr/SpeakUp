const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A categorie must have a name"],
    unique: true,
    trim: true,
  },
  //czy ulubione czy normalne- nie wiem czy będę potrzebować, do zastanowienia
  isfavourite: {
    type: Boolean,
  },
  descryption: {
    type: String,
    trim: true,
  },
  imageCategory: {
    type: String,
    required: [true, "A category must have a image"],
  },
  images: [String],
  cteatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Category = mongoose.model("Category", categoriesSchema);

module.exports = Category;
