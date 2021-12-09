const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workOutSchema = new Schema({
  _id: {
    type: mongoose.ObjectId,
  },
  day: {
    type: Date,
  },
  exercises: [{
    type: {
      type: String
    },
    name: {
      type: String,
    },
    duration: {
      type: Number
    },
    weight: {
      type: Number,
    },
    reps: {
      type: Number,
    },
    sets: {
      type: Number
    },
    distance: {
      type: Number
    }
  }]
},
  {
    versionKey: false // deleting "__v"
  });

const workOut = mongoose.model("Workout", workOutSchema);

module.exports = workOut;
