const Book = require("./../models/bookModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");

exports.getAllBooks = catchAsync(async (req, res, next) => {
  // if (req.body.bookIdList) {
  //   const books = await Book.find({
  //     _id: { $in: req.body.bookIdList },
  //   });
  //   res.status(200).json({
  //     status: "success",
  //     results: books.length,
  //     data: {
  //       books,
  //     },
  //   });
  // }
  const numberOfBooks = await Book.find();
  const features = new APIFeatures(Book.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const books = await features.query;
  // const books = await Book.find();
  res.status(200).json({
    status: "success",
    results: numberOfBooks.length,
    data: {
      books,
    },
  });
});

exports.getBooks = catchAsync(async (req, res, next) => {
  console.log();
  res.status(200).json({
    status: "success",
    results: books.length,
    data: {
      books,
    },
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new AppError("No book found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});

exports.createBook = catchAsync(async (req, res, next) => {
  const newBook = await Book.create({
    lower_title: req.body.title.toLowerCase().split(" ").join(""),
    ...req.body,
  });

  res.status(201).json({
    status: "success",
    data: {
      book: newBook,
    },
  });
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    return next(new AppError("No book found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    return next(new AppError("No Book found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
