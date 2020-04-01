const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GalerySchema = new Schema({
  judul: {
    type: String,
    default: true
  },
  deskripsi: {
    type: String,
    required: true
  },
  audio: {
    type: String,
    required: true
  },
  gambar: {
    type: String,
    required: true
  }
});

module.exports = Galery = mongoose.model("Galery", GalerySchema);
