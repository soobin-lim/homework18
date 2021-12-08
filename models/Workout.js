const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workOutSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter a name for workOut"
  },
  value: {
    type: Number,
    required: "Enter an amount"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const workOut = mongoose.model("Workout", workOutSchema);

module.exports = workOut;
