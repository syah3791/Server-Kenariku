const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinanceSchema = new Schema({
  tanggal: {
    type: Date,
    default: Date.now
  },
  idBird: {
    type: String,
    default: true
  },
  pembeli: {
    type: String,
    required: true
  },
  harga: {
    type: String,
    required: true
  }
});

module.exports = Finance = mongoose.model("finance", FinanceSchema);
