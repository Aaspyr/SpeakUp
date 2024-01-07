const express = require("express");
const cardsController = require("./../controllers/cardsController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(cardsController.getAllCards)
  .post(cardsController.createCard);

router
  .route("/:id")
  .get(cardsController.getCard)
  .patch(cardsController.updateCard)
  .delete(authController.restrictTo("admin"), cardsController.deleteCard);

module.exports = router;
