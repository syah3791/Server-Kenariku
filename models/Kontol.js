const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KontolSchema = new Schema({
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
  umur: {
    type: String,
    required: true
  },
  warna: {
    type: String,
    required: true
  },

  jenis_kelamin: {
    type: String,
    required: true
  }
});

module.exports = Kontol = mongoose.model("kontol", KontolSchema);
