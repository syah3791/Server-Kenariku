const express = require("express");
const router = express.Router();

const Report = require("../../models/Report");
const Burung = require("../../models/Burung");

// get
router.get("/getburung", (req, res) => {
  Burung.find({status: 1},{_id:0, name: 1}).then(burungs => {
    return res.status(200).json({ success: true, data: burungs });
  });
});

// get
router.get("/getreport", (req, res) => {
  Report.find().sort({tanggal:-1, jam: -1}).then(report => {
    return res.status(200).json({ success: true, data: report });
  });
});

//add burung
router.post("/add", (req, res) => {
  const newReport = new Report({
    nama: req.body.nama,
    tanggal: req.body.tanggal,
    jam: req.body.jam,
    log: req.body.log,
    pakan: req.body.pakan,
    status: req.body.status
  });
  newReport.save().then(report => res.json(report));
});

// Search report
router.get("/find/:id", (req, res) => {
  Report.findById(req.params.id)
    .then(hasil => {
      if (hasil) {
        res.status(200).json(hasil);
      } else {
        res.status(200).json({
          message: "Pencarian Sukses"
        });
      }
    })
    .catch(err =>
      res.status(400).json({
        message: "Not Found!"
      })
    );
});

//update data report
router.put("/update/:id", (req, res) => {
  Report.findById(req.params.id)
    .then(report => {
      console.log(req.body);
      report
        .updateOne({
          nama: req.body.nama,
          tanggal: req.body.tanggal,
          jam: req.body.jam,
          log: req.body.log,
          pakan: req.body.pakan,
          status: req.body.status
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
