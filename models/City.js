const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
    city: {
        type: String,
       
      },
      price: {
        type: Number,
       
      },
      center: {
        type: Array,
       
      },
      sites: {
        type: Array,
       
      },

});

module.exports = mongoose.model("City", CitySchema);
