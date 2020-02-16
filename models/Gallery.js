const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
  namaBurung: {
    type: String,
    required: true
  },

  judul: {
    type: String,
    required: true
  },
  deskripsi: {
    type: String,
    default: true
  },
  foto: {
    type: String,
    default: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Gallery = mongoose.model("gallery", GallerySchema);
