const mongoose = require("mongoose");

const reserveBookSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true,
  },
  bookTitle: {
    type: String,
  },
  bookImage: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "reserved", "borrowed", "returned"],
    default: "pending",
    required: true,
  },
  pendingAt: Date,
  reservedAt: Date,
  borrowedAt: Date,
  returnedAt: Date,
});

reserveBookSchema.pre("save", function (next) {
  if (this.isNew) return next();
  this.pendingAt = Date.now() - 1000;
  next();
});

const Reserve = mongoose.model("Reserve", reserveBookSchema);
module.exports = Reserve;
