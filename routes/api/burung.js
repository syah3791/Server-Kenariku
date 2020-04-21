const express = require("express");
const router = express.Router();

const Burung = require("../../models/Burung");
const Report = require("../../models/Report");

// get
router.get("/getburung", (req, res) => {
  Burung.find().then(burungs => {
    return res.status(200).json({ success: true, data: burungs });
  });
});

// get
router.get("/checkburung/:id", (req, res) => {
  Burung.find({name: req.params.id},{name: 1})
    .then(hasil => {
      if (hasil[0]) {
        res.status(200).json({ success: true });
      } else {
        res.status(200).json({ success: false });
      }
    })
    .catch(err =>
      res.status(400).json({
        success: true
      })
    );
});

//add burung
router.post("/add", (req, res) => {
  const newBurung = new Burung({
    name: req.body.name,
    jenis: req.body.jenis,
    warna: req.body.warna,
    deskripsi: req.body.deskripsi,
    tanggal: req.body.tanggal,
    harga: req.body.harga,
    jenis_kelamin: req.body.jenis_kelamin,
    status: 1,
    breeding: 0,
    image1: req.body.image1,
    image2: req.body.image2,
    image3: req.body.image3
  });
  newBurung.save().then(burungs => res.json(burungs));
});

// Search burung
router.get("/find/:id", (req, res) => {
  Burung.findById(req.params.id)
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

//update data burung
router.put("/update/:id", (req, res) => {
  Burung.findById(req.params.id)
    .then(burung => {
      console.log(req.body);
      burung
        .updateOne({
          name: req.body.name,
          jenis: req.body.jenis,
          warna: req.body.warna,
          deskripsi: req.body.deskripsi,
          tanggal: req.body.tanggal,          
          harga: req.body.harga,
          status: 1,
          jenis_kelamin: req.body.jenis_kelamin,
          breeding: 0,
          image1: req.body.image1,
          image2: req.body.image2,
          image3: req.body.image3
        })
        .then(() => res.json({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ success: false });
    });
});
//find report
router.get("/findReport/:id", (req, res) => {
  Burung.findById(req.params.id)
    .then(hasil => {
      Report.find({nama: hasil.name},).sort({tanggal:-1, jam: -1}).then(burungs => {
    return res.status(200).json({ success: true, data: burungs });
  });
    })
    .catch(err =>
      res.status(400).json({
        message: "Not Found!"
      })
    );
});

router.delete("/delete/:id", (req, res) => {
  Burung.findById(req.params.id)
    .then(burungs => burungs.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
