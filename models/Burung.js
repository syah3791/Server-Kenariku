const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BurungSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  deskripsi: {
    type: String,
    default: true
  },
  jenis: {
    type: String,
    required: true
  },
  tanggal: {
    type: Date,
    required: true
  },
  warna: {
    type: String,
    required: true
  },
  jenis_kelamin: {
    type: String,
    required: true
  },
  harga: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  breeding: {
    type: String,
    required: true
  },
  image1: {
    type: String,
    required: true
  },
  image2: {
    type: String,
    required: true
  },
  image3: {
    type: String,
    required: true
  }
});

module.exports = Burung = mongoose.model("burung", BurungSchema);
