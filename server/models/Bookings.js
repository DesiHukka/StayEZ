const mongoose = require("mongoose");
const Users = require("./Users/Users");
const Places = require("./Users/Places/Places");
const bookingSchema = mongoose.Schema({
  checkIn: String,
  checkOut: String,
  guests: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: Users },
  place: { type: mongoose.Schema.Types.ObjectId, ref: Places },
});

const BookingModel = mongoose.model("Bookings", bookingSchema);

module.exports = BookingModel;
