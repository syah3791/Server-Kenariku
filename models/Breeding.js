const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BreedingSchema = new Schema({
  betina: {
    type: String,
    default: true
  },
  jantan: {
    type: String,
    required: true
  },
  imagebetina: {
    type: String,
    required: true
  },
  imagejantan: {
    type: String,
    required: true
  }
});

module.exports = Breeding = mongoose.model("breeding", BreedingSchema);
