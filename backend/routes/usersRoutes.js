const express = require("express");
const usersController = require("./../controllers/usersController");
const authController = require("./../controllers/authController");

const router = express.Router();

//Authentication routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);

//User editing routes
router.get("/me", authController.protect, usersController.updateMe);
router.patch("/updateMe", authController.protect, usersController.updateMe);
router.delete("/deleteMe", authController.protect, usersController.deleteMe);

//Basic routes
router
  .route("/")
  .get(authController.protect, usersController.getAllUsers)
  .post(usersController.createUser);
router
  .route("/:id")
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
