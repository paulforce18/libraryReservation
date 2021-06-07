const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  author: {
    type: [String],
    required: true,
  },
  subjects: {
    type: [String],
    required: true,
  },
  copyrightDate: {
    type: String,
    required: true,
  },
  isbn: Number,
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
