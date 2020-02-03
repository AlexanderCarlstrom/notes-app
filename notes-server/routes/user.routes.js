const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).send('Email already exists');
    } else {
      const split = req.body.name.split(' ');
      let newAvatar = '';
      if (split.length > 1) {
        newAvatar = split[0][0] + split[1][0];
      } else {
        newAvatar = split[0][0] + split[0][1];
      }

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: newAvatar
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
});

module.exports = router;
