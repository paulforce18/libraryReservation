const express = require("express");
const bookController = require("./../controllers/bookController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(bookController.createBook)
  .get(authController.protect, bookController.getAllBooks);

router
  .route("/:id")
  .get(bookController.getBook)
  .patch(bookController.updateBook)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "librarian"),
    bookController.deleteBook
  );

module.exports = router;
