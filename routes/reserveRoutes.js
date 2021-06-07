const express = require("express");
const reserveBookController = require("./../controllers/reserveBookController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/").post(reserveBookController.createReservation);

router
  .route("/:id&:status")
  .get(authController.protect, reserveBookController.getReservations);

module.exports = router;
