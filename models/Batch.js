const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BatchSchema = new Schema({
  idBreeding: {
    type: String,
    default: true
  },
  nama: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = Batch = mongoose.model("Batch", BatchSchema);
