const express = require("express");
const router = express.Router();
const Burung = require("../../models/Burung");

const Gallery = require("../../models/Gallery");

// get galery
router.get("/getgallery", (req, res) => {
  Gallery.find().then(galleries => {
    return res.status(200).json(galleries);
  });
});
// get burung
router.get("/getburung", (req, res) => {
  Burung.find({ status: 1 }, { _id: 0, name: 1 }).then(burungs => {
    return res.status(200).json({ success: true, data: burungs });
  });
});
// add gallery
router.post("/add", (req, res) => {
  const newGallery = new Gallery({
    namaBurung: req.body.namaBurung,
    judul: req.body.judul,
    deskripsi: req.body.deskripsi,
    foto: req.body.foto
  });
  newGallery.save().then(galleries => res.json(galleries));
});

// delete
router.delete("/delete/:id", (req, res) => {
  Gallery.findById(req.params.id)
    .then(galleries =>
      galleries.remove().then(() => res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

//search
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

module.exports = router;
