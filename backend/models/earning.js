const mongoose = require("mongoose");

const earningSchema = new mongoose.Schema({
  name: String,
  income: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Earning", earningSchema);
