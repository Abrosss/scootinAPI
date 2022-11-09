const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId, ref: 'User'
},
  time: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
  },
  street:{
    type: String,
  },
  charge:{
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: Number
  }

});

module.exports = mongoose.model("Ride", RideSchema);
