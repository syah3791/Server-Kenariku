const express = require("express");
const router = express.Router();

const Batch = require("../../models/Batch");
const Batchlog = require("../../models/Batchlog");
const Burung = require("../../models/Breeding");


// get
router.get("/getBatchlog/:id", (req, res) => {
  Batchlog.find({idBatch: req.params.id}).then(Batchs => {
    return res.status(200).json({ success: true, data: Batchs });
  });
});

router.get("/getBatch/:id", (req, res) => {
  Batch.findById(req.params.id).then(Batchs => {
    return res.status(200).json({ success: true, data: Batchs });
  });
});
router.get("/getname/:id", (req, res) => {
  Batch.findById(req.params.id).then(Batchs => {
    Breeding.find({_id: Batchs.idBreeding},{betina: 1, jantan: 1}).then(Breedings => {
    return res.status(200).json({ success: true, data: Breedings });
  });
  });
  
});

//add Batch
router.post("/add", (req, res) => {
  const newBatch = new Batchlog({
    idBatch: req.body.idbatch,
    status: req.body.status,
    tanggal: req.body.tanggal,
    jam: req.body.jam,
    born: req.body.born,
    die: req.body.die,
    log: req.body.log
  });
  newBatch.save().then(Batchs => res.json(Batchs));
});

//update status burung
router.put("/update/:id", (req, res) => {
  Batch.findById(req.params.id)
    .then(batch => {
      console.log(req.body);
      batch
        .updateOne({
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
  Batchlog.findById(req.params.id)
    .then(Batchs => Batchs.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
