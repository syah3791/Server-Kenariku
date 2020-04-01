const express = require("express");
const router = express.Router();

const Image = require("../../models/Image");

// get
router.get("/getImage/:id", (req, res) => {
  Image.find({judul: req.params.id}).then(Images => {
    return res.status(200).json({ success: true, data: Images });
  });
});

//add Image
router.post("/add", (req, res) => {
  const newImage = new Image({
    judul: req.body.judul,
    image: req.body.image
  });
  newImage.save().then(Images => res.json(Images));
});

//update status burung


router.delete("/delete/:id", (req, res) => {
  Image.findById(req.params.id)
    .then(Images => Images.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
