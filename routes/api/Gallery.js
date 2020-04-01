const express = require("express");
const router = express.Router();

const Gallery = require("../../models/Gallery");

// get
router.get("/getGallery", (req, res) => {
  Gallery.find().then(Gallerys => {
    return res.status(200).json({ success: true, data: Gallerys });
  });
});

//add Gallery
router.post("/add", (req, res) => {
  const newGallery = new Gallery({
    judul: req.body.judul,
    deskripsi: req.body.deskripsi,
    audio: req.body.audio,
    gambar: req.body.gambar
  });
  newGallery.save().then(Gallerys => res.json(Gallerys));
});

//update status burung


router.delete("/delete/:id", (req, res) => {
  Gallery.findById(req.params.id)
    .then(Gallerys => Gallerys.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
