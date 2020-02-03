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

// Register New User
router.post("/register", (req, res) => {
  const { errors, isValid } = validationRegister(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  console.log("====================================");
  console.log("valid");
  console.log("====================================");

  // Check for user email if exists
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
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
        return res.status(404).json({ message: "User already registered!" });
      }
    })
    .catch(err => {
      console.log("====================================");
      console.log("Catch xixixix");
      console.log("====================================");
      return res.status(400).json(err);
    });
});

// Login User
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { errors, isValid } = validationLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // find user by email
  User.findOne({
    email
  }).then(user => {
    if (!user) {
      return res.status(400).json({
        email: "user not found"
      });
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // create payload
          const payload = {
            id: user.id,
            name: user.name
          };

          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 3600
            },
            (err, token) => {
              res.json({
                success: true,
                // use Bearer protocol format
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({
            password: "password incorrect"
          });
        }
      });
    }
  });
});

router.post("/nehru_kecil", (req, res) => res.json(req.body.ukuran));

module.exports = router;
