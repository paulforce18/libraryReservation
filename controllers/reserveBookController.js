const Reserve = require("./../models/reserveBookModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.createReservation = catchAsync(async (req, res, next) => {
  const reserve = await Reserve.create({
    bookId: req.body.bookId,
    bookTitle: req.body.bookTitle,
    bookImage: req.body.bookImage,
    userId: req.body.userId,
    pendingAt: Date.now(),
  });

  res.status(200).json({
    status: "success",
    data: {
      reserve,
    },
  });
});

exports.getReservations = catchAsync(async (req, res, next) => {
  const pending = await Reserve.find({
    userId: req.params.id,
    status: req.params.status,
  });
  res.status(200).json({
    status: "success",
    results: pending.length,
    pending,
  });
});
