const express = require("express");
const cardsController = require("./../controllers/cardsController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, cardsController.getAllCards)
  .post(cardsController.createCard);

router
  .route("/:id")
  .get(authController.protect, cardsController.getCard)
  .patch(cardsController.updateCard)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    cardsController.deleteCard
  );

module.exports = router;
