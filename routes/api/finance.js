const express = require("express");
const router = express.Router();

const Report = require("../../models/Finance");
const Burung = require("../../models/Burung");

// get
router.get("/getburung", (req, res) => {
  Burung.find({status: 1},{_id:1, name: 1}).then(burungs => {
    return res.status(200).json({ success: true, data: burungs });
  });
});

// get
router.get("/get", (req, res) => {
  Report.find().sort({tanggal:-1}).then(report => {
    return res.status(200).json({ success: true, data: report });
  });
});

//add burung
router.post("/add", (req, res) => {
  const newReport = new Report({
    tanggal: req.body.tanggal,
    idBird: req.body.idBird,
    pembeli: req.body.pembeli,
    harga: req.body.harga
  });
  newReport.save().then(report => res.json(report));
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

module.exports = router;
