const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  nama: {
    type: String,
    required: true
  },
  tanggal: {
    type: Date,
    default: Date.now
  },
  jam: {
    type: String,
    required: true
  },  
  log: {
    type: String,
    required: true
  },
  pakan: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = Report = mongoose.model("reports", ReportSchema);
