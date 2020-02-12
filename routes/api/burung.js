const express = require("express");
const router = express.Router();

const Burung = require("../../models/Burung");

// get
router.get("/getburung", (req, res) => {
  Burung.find().then(burungs => {
    return res.status(200).json({ success: true, data: burungs });
  });
});

//add burung
router.post("/add", (req, res) => {
  const newBurung = new Burung({
    name: req.body.name,
    jenis: req.body.jenis,
    warna: req.body.warna,
    deskripsi: req.body.deskripsi,
    umur: req.body.umur,
    harga: req.body.harga,
    status: req.body.status,
    jenis_kelamin: req.body.jenis_kelamin,
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
          umur: req.body.umur,          
          harga: req.body.harga,
          status: req.body.status,
          jenis_kelamin: req.body.jenis_kelamin,
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

router.delete("/delete/:id", (req, res) => {
  Burung.findById(req.params.id)
    .then(burungs => burungs.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
