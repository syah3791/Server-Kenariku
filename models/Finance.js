const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinanceSchema = new Schema({
  status: {
    type: String,
    default: true
  },
  tanggal: {
    type: Date,
    default: Date.now
  },
  in: {
    type: Number
  },
  out: {
    type: Number
  },
  idBird: {
    type: String
  },
  pembeli: {
    type: String
  },
  keterangan: {
    type: String
  },
});

module.exports = Finance = mongoose.model("finance", FinanceSchema);
