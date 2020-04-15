const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
require('dotenv').config();

router.post('/register', (req, res) => {
  register(req, res);
});

router.post('/login', (req, res) => {
  loginWithCredentials(req, res);
});

router.get('/token', authenticate, (req, res) => {
  loginWithToken(req, res);
});

router.get('/logout', authenticate, (req, res) => {
  logout(req, res);
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
  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).send('Email already exists');
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;
        const user = new User({
          name: name,
          email: email,
          password: hash,
        });
        user.password = hash;
        user
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });
    }
  });
}

async function loginWithCredentials(req, res) {
  return User.findByCredentials(req.body.email, req.body.password)
    .then((user) => {
      return user
        .createSession()
        .then((refreshToken) => {
          return user.generateAccessToken().then((accessToken) => {
            return { refreshToken, accessToken };
          });
        })
        .then((tokens) => {
          return res.send({
            success: true,
            user: user,
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken,
          });
        });
    })
    .catch((err) => {
      res.send({
        success: false,
        error: err,
      });
    });
}

function loginWithToken(req, res) {
  return User.findByIdAndToken(req.user._id, req.headers['refresh-token'])
    .then((user) => {
      return user.generateAccessToken().then((accessToken) => {
        return res.send({
          success: true,
          user: user,
          accessToken: accessToken,
        });
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        error: err,
      });
    });
}

function logout(req, res) {
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }

    if (!user) {
      return res.sendStatus(401);
    }

    _.remove(user.sessions, (n) => {
      return (n.token = req.headers['refresh-token']);
    });

    user.save((err) => {
      if (err) {
        console.log(err);
        return res.send('Could not save');
      }

      return res.send('done');
    });
  });
}

function authenticate(req, res, next) {
  const token = req.headers['access-token'];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = decoded;
    next();
  });
}

module.exports = router;
