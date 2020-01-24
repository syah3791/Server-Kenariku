const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Models
const User = require("../../models/User");

// Keys
const keys = require("../../config/keys");

// Validation
const validationRegister = require("../../validation/register");
const validationLogin = require("../../validation/login");

router.get("/kontol", (req, res) => res.json({ message: "Nehru Kontol" }));

// Register New User
router.post("/register", (req, res) => {
  const { errors, isValid } = validationRegister(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  console.log("====================================");
  console.log("kontol kontol");
  console.log("====================================");

  // Check for user email if exists
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        // make new user
        const newUser = new User({
          name: req.body.name,
          alamat: req.body.alamat,
          email: req.body.email,
          password: req.body.password
        });

        // bcrypting password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.status(200).json(user))
              .catch(err => console.log(err));
          });
        });
      } else {
        return res.status(404).json({ message: "User not Found kontol!!" });
      }
    })
    .catch(err => {
      console.log("====================================");
      console.log("Catch xixixix");
      console.log("====================================");
      return res.status(400).json(err);
    });
});

router.post("/kontol_nehru_kecil", (req, res) => res.json(req.body.ukuran));

module.exports = router;
