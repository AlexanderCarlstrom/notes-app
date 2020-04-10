const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const Schema = mongoose.Schema;
const Note = require('./Note').Note;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: {
    type: [Note],
    required: true,
    default: [],
  },
  sessions: [
    {
      token: {
        type: String,
        required: true,
      },
      expiresAt: {
        type: Number,
        required: true,
      },
    },
  ],
});

userSchema.set('timestamps', true);

// return object without password, notes, sessions
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  return _.omit(userObject, ['password', 'notes', 'sessions']);
};

// generate jwt
userSchema.methods.generateAccessToken = function () {
  const user = this;
  return new Promise((resolve, reject) => {
    jwt.sign(
      { _id: user._id },
      process.env.SECRET,
      { expiresIn: '15m' },
      (err, token) => {
        if (err)
          return reject({
            message: 'could not generate token',
            error: err,
          });
        resolve(token);
      }
    );
  });
};

// generate refresh token
userSchema.methods.generateRefreshToken = function () {
  const user = this;
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, bytes) => {
      if (err) return reject(err);
      return resolve(bytes.toString('hex'));
    });
  });
};

// create session
userSchema.methods.createSession = function () {
  const user = this;

  return new Promise((resolve, reject) => {
    user.generateRefreshToken().then((refreshToken) => {
      // calculate milliseconds ten days in the future
      const tenDays = 20 * 24 * 60 * 60 * 1000;
      const expiration = Date.now() + tenDays;

      // add session to user sessions
      user.sessions.push({
        token: refreshToken,
        expiresAt: expiration,
      });

      // save user sessions
      user
        .save()
        .then(() => {
          resolve(refreshToken);
        })
        .catch((e) => {
          reject('could not create token');
        });
    });
  });
};

// find user by email and password
userSchema.statics.findByCredentials = function (email, password) {
  const User = this;

  return new Promise((resolve, reject) => {
    User.findOne({ email: email }).then((user) => {
      if (!user) reject('email not found');

      bcrypt.compare(password, user.password).then((result) => {
        if (result) {
          resolve(user);
        } else {
          reject('invalid password');
        }
      });
    });
  });
};

// find user by id and refresh token
userSchema.statics.findByIdAndToken = function (id, token) {
  const User = this;
  return User.findOne({ _id: id, 'sessions.token': token });
};

module.exports = User = mongoose.model('users', userSchema, 'User');
