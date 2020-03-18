const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  register(req, res);
});

router.post('/login', (req, res) => {
  login(req, res);
})

router.post;

function register(req, res) {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).send('Email already exists');
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    }
  });
}

function login(req, res) {

  const email = req.body.email;
  const password = req.body.password;

  var hash = await bcrypt.hash(password, 10);
  User.findOne({ email: email, password: hash}).then(user => {
    if (!user) {
      return res.status(400).send('user not found');
    }

    const split = user.name.split(' ');
    let avatar = split[0];
    if (split.length > 1) {
      avatar = split[0][0] + split[1][0];
    } else {
      avatar = split[0][0]
    }
    const user = {
      id: user.id,
      email: user.email,
      avatar: avatar,
      notes: user.notes,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 10
    }
  });
}

module.exports = router;
