const mongoose = require("mongoose");
const Users = require("../Users");

const placeSchema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: Users },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  price: Number,
});

const Places = mongoose.model("Places", placeSchema);
module.exports = Places;
