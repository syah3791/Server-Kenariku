const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
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

module.exports = Gallery = mongoose.model("Gallery", GallerySchema);
