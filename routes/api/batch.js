const express = require("express");
const router = express.Router();

const Batch = require("../../models/Batch");
const Burung = require("../../models/Breeding");

// get
router.get("/getBatch/:id", (req, res) => {
  Batch.find({idBreeding: req.params.id}).then(Batchs => {
    return res.status(200).json({ success: true, data: Batchs });
  });
});

router.get("/getname/:id", (req, res) => {
  Breeding.find({_id: req.params.id},{betina: 1, jantan: 1}).then(Breedings => {
    return res.status(200).json({ success: true, data: Breedings });
  });
});

//add Batch
router.post("/add", (req, res) => {
  const newBatch = new Batch({
    idBreeding: req.body.idbreeding,
    nama: req.body.nama,
    status: 1
  });
  newBatch.save().then(Batchs => res.json(Batchs));
});

//update status burung


router.delete("/delete/:id", (req, res) => {
  Batch.findById(req.params.id)
    .then(Batchs => Batchs.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
