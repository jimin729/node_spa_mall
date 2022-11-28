const mongoose = require("mongoose");

const cattSchema = new mongoose.Schema({
  goodsId: {
    type: Number,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("Cart", cattSchema);