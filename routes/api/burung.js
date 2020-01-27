const express = require("express");
const router = express.Router();

const Burung = require("../../models/Burung");

// Search burung
router.post("/carinama", (req, res) => {
  Burung.find({ name: req.body.name })
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

router.post("/ShowBurung", (req, res) => {
  const newBurung = new Burung({
    name: req.body.name,
    jenis: req.body.jenis,
    warna: req.body.warna,
    deskripsi: req.body.deskripsi,
    umur: req.body.umur,
    jenis_kelamin: req.body.jenis_kelamin
  });
  newBurung.save().then(burungs => res.json(burungs));
});

router.delete("/:id", (req, res) => {
  Burung.findById(req.params.id)
    .then(burungs => burungs.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;