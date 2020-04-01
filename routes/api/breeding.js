const express = require("express");
const router = express.Router();

const Breeding = require("../../models/Breeding");
const Burung = require("../../models/Burung");
const Report = require("../../models/Report");

// get
router.get("/getBreeding", (req, res) => {
  Breeding.find().then(Breedings => {
    return res.status(200).json({ success: true, data: Breedings });
  });
});

// get
router.get("/getname/:id", (req, res) => {
  Breeding.find({_id: req.params.id},{betina: 1, jantan: 1}).then(Breedings => {
    return res.status(200).json({ success: true, data: Breedings });
  });
});

// get
router.get("/getBetina", (req, res) => {
  Burung.find({status: 1, jenis_kelamin: "Betina", breeding: 0},{_id: 1,name: 1, image1: 1}).then(burungs => {
    return res.status(200).json({ success: true, data: burungs });
  });
});
// get
router.get("/getJantan", (req, res) => {
  Burung.find({status: 1, jenis_kelamin: "Jantan", breeding: 0},{_id: 1,name: 1, image1: 1}).then(burungs => {
    return res.status(200).json({ success: true, data: burungs });
  });
});

//add Breeding
router.post("/add", (req, res) => {
  const newBreeding = new Breeding({
    betina: req.body.betina,
    jantan: req.body.jantan,
    imagebetina: req.body.imagebetina,
    imagejantan: req.body.imagejantan
  });
  newBreeding.save().then(Breedings => res.json(Breedings));
});

//update status burung
router.put("/update/:id", (req, res) => {
  Burung.findById(req.params.id)
    .then(burung => {
      console.log(req.body);
      burung
        .updateOne({
          breeding: 1
        })
        .then(() => res.json({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ success: false });
    });
});

// Search Breeding
router.get("/find/:id", (req, res) => {
  Breeding.findById(req.params.id)
    .then(hasil => {
      Report.find({nama: {$in : [hasil.betina, hasil.jantan]}},).sort({tanggal:-1, jam: -1}).then(burungs => {
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
  Breeding.findById(req.params.id)
    .then(Breedings => Breedings.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
