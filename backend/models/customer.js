const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  givenId: Number,
  parentsPhone: String,
  enterTime: String,
  exitTime: {
    type: String,
    required: false
  },
  isTimedOut: {
    type: Boolean,
    default: false,
  },
  date: String,
  plan: String,
  price: Number,
});

module.exports = mongoose.model("Customer", customerSchema);
