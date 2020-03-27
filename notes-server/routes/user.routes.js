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
});

router.post('/forgot-password', (req, res) => {
  console.log('forgot password');
  res.send('ok');
});

router.post;

function register(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then(user => {
    if (user) {
      return res.status(400).send('Email already exists');
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;
        const user = new User({
          name: name,
          email: email,
          password: hash
        });
        user.password = hash;
        user
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    }
  });
}

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.status(400).send('invalid email');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).send('invalid password');
    }
    // email and password correct
    const split = user.name.split(' ');
    let avatar = split[0];
    if (split.length > 1) {
      avatar = split[0][0] + split[1][0];
    } else {
      avatar = split[0][0];
    }
    const newUser = {
      id: user.id,
      email: user.email,
      avatar: avatar,
      notes: user.notes,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 10
    };

    jwt.sign({ user: newUser }, process.env.SECRET, (err, token) => {
      if (err) return res.send(err);
      return res.send(token);
    });
  });
}

module.exports = router;
