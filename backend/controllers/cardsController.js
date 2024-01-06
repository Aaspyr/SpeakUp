const AppError = require("../utils/appError");
const Card = require("./../models/cardsModel");
const catchAsync = require("./../utils/catchAsync");

//ROUTES
//1. Get All Cards
exports.getAllCards = catchAsync(async (req, res, next) => {
  //Filrtering
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit"];

  excludedFields.forEach((el) => delete queryObj[el]);
  console.log(req.query, queryObj);

  const query = Card.find(queryObj);
  const cards = await query;
  // const features = new APIFeatures(Card.find(), req.filter())
  // const cards = await features.query;

  res.status(200).json({
    status: "success",
    results: cards.length,
    data: {
      cards,
    },
  });
});

//2. Get card by Id
exports.getCard = catchAsync(async (req, res, next) => {
  const card = await Card.findById(req.params.id);
  if (!card) {
    return next(new AppError("No card find with that id"));
  }
  res.status(200).json({
    status: "success",
    results: card.length,
    data: {
      card,
    },
  });
});

//3. Create a new card
exports.createCard = catchAsync(async (req, res, next) => {
  const newCard = await Card.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      cards: newCard,
    },
  });
});

//4. Update existing card
exports.updateCard = catchAsync(async (req, res, next) => {
  const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!card) {
    return next(new AppError("No card find with that id"));
  }
  res.status(200).json({
    status: "success",
    data: { card },
  });
});

//5. Delete existing card
exports.deleteCard = catchAsync(async (req, res, next) => {
  const card = await Card.findByIdAndDelete(req.params.id);
  if (!card) {
    return next(new AppError("No card find with that id"));
  }
  res.status(200).json({
    status: "success",
    data: { card },
  });
});

///////////////////////////////////
// const APIFeatues {
// constructor (query, queryString) {
//   this.queryString = queryString
// }

// filter(){
//   const queryObj = { ...this.query };
//   const excludedFields = ["page", "sort", "limit"];

//   excludedFields.forEach((el) => delete queryObj[el]);
//   console.log(req.query, queryObj);

// let queryStr = JSON.stringify(queryObj)
// queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match =>`$${match}`)
//   this.query.find(JSON.parse(queryStr));

//   return this
// }
