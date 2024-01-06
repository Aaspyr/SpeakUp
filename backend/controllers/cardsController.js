const Card = require("./../models/cardsModel");

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

//ROUTES
//1. Get All Cards
exports.getAllCards = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error getting cards",
    });
  }
};

//2. Get card by Id
exports.getCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    res.status(200).json({
      status: "success",
      results: card.length,
      data: {
        card,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

//3. Create a new card
exports.createCard = async (req, res) => {
  try {
    const newCard = await Card.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        cards: newCard,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error creating card",
    });
  }
};

//4. Update existing card
exports.updateCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: { card },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error updating card",
    });
  }
};

//5. Delete existing card
exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: { card },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error deleting card",
    });
  }
};
