const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SaldoSchema = new Schema({
  saldo: {
    type: Number,
    default: true
  }
});

module.exports = Saldo = mongoose.model("Saldo", SaldoSchema);
