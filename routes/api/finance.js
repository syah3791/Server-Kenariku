const express = require("express");
const router = express.Router();

const Report = require("../../models/Finance");
const Burung = require("../../models/Burung");
const Saldo = require("../../models/Saldo");

// get
router.get("/getburung", (req, res) => {
  Burung.find({ status: 1 }, { _id: 1, name: 1 }).then(burungs => {
    return res.status(200).json({ success: true, data: burungs });
  });
});

// get
router.get("/getSaldo", (req, res) => {
  Saldo.findOne().then(saldo => {
    return res.status(200).json({ success: true, data: saldo });
  });
});

// get
router.get("/get", (req, res) => {
  Report.aggregate(
   [
     {
       $group:
         {
           _id: { month: { $month: "$tanggal"}, year: { $year: "$tanggal" } },
           pengeluaran: { $sum: "$out" },
           pendapatan: { $sum: "$in" },
           count: { $sum: 1 }
         }
     }
   ]
).sort({ _id: -1 })
    .then(report => {
      return res.status(200).json({ success: true, data: report });
    });
    
});
// get
router.get("/getByMonth/:id", (req, res) => {
  var temp = req.params.id.split("+");
  Report.aggregate(
    [
      {$project : 
        { 
          day : { $dayOfMonth : "$tanggal" },
          month : { $month : "$tanggal" },
          year: { $year: "$tanggal" },
          keterangan: 1,
          in: 1,
          out: 1,
          status: 1
        } 
      },
      { $match : { "month" : parseInt(temp[0]) , "year": parseInt(temp[1])}}
    ]
).sort({ _id: -1 })
    .then(report => {
      return res.status(200).json({ success: true, data: report });
    });
});
//get id
router.get("/getById/:id", (req, res) => {
  Report.findById(req.params.id).then(report => {
    return res.status(200).json({ success: true, data: report });
  });
});
//get bird id
router.put("/getBirdById/:id", (req, res) => {
  Burung.findById(req.params.id).then(burungs => {
    return res.status(200).json({ success: true, data: burungs });
  });
});

//add pengeluaran
router.post("/addPengeluaran", (req, res) => {
  var temp = 0;
  Saldo.findOne().then(saldo => {
    console.log(saldo.saldo);
    temp = saldo.saldo-parseInt(req.body.nominal);
    console.log(temp);
    saldo.updateOne({saldo: temp}).then();
  });
  const newFinance = new Finance({
    status: 0,
    tanggal: req.body.tanggal,
    out: req.body.nominal,
    keterangan: req.body.keterangan    
  });
  newFinance.save().then(finances => res.json(finances));
});

//add pemasukkan
router.post("/addPendapatan", (req, res) => {
  var temp = 0;
  Saldo.findOne().then(saldo => {
    console.log(saldo.saldo);
    temp = parseInt(saldo.saldo)+parseInt(req.body.nominal);
    console.log(temp);
    saldo.updateOne({saldo: temp.toString()}).then();
  });
  const newFinance = new Finance({
    status: 1,
    tanggal: req.body.tanggal,
    in: req.body.nominal,
    keterangan: req.body.keterangan,
    idBird: req.body.idBird,
    pembeli: req.body.pembeli,    
  });
  newFinance.save().then(finances => res.json(finances));
});
//update status burung
router.put("/update/:id", (req, res) => {
  Burung.findById(req.params.id)
    .then(burung => {
      console.log(req.body);
      burung
        .updateOne({
          status: 0
        })
        .then(() => res.json({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ success: false });
    });
});
router.delete("/delete/:id", (req, res) => {
  Report.findById(req.params.id)
    .then(report => report.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
