const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinanceSchema = new Schema({
  status: {
    type: String,
    required: true
  },
  tanggal: {
    type: Date,
    default: Date.now
  },  
  keterangan: {
    type: String,
    default: true
  },
  out: {
    type: Number,
    required: false
  },
  in: {
    type: Number,
    required: false
  },
  idBird: {
    type: String,
    default: false
  },
  pembeli: {
    type: String,
    required: false
  },
  
});

module.exports = Finance = mongoose.model("finance", FinanceSchema);
