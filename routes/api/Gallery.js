const express = require("express");
const router = express.Router();

const Gallery = require("../../models/Gallery");

// get
router.get("/getgallery", (req, res) => {
  Gallery.find().then(gallery => {
    return res.status(200).json(gallery);
  });
});
router.post("/showgallery", (req, res) => {
  const newGallery = new Gallery({
    judul: req.body.judul,
    deskripsi: req.body.deskripsi
  });
  newGallery.save().then(galleries => res.json(galleries));
});
module.exports = router;
