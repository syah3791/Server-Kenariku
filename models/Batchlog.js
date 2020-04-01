const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BatchlogSchema = new Schema({
  idBatch: {
    type: String,
    default: true
  },
  status: {
    type: String,
    required: true
  },
  tanggal: {
    type: Date,
    required: true
  },
  jam: {
    type: String,
    required: true
  },
  born: {
    type: String,
    required: false
  },
  die: {
    type: String,
    required: false
  },
  log: {
    type: String,
    required: true
  }
});

module.exports = Batchlog = mongoose.model("Batchlog", BatchlogSchema);