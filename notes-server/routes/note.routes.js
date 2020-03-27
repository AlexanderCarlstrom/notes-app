const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Note = require('../models/Note');
const expressJwt = require('express-jwt');
require('dotenv').config();

// get notes
router.post('/get', expressJwt({ secret: process.env.SECRET }), (req, res) => {
  getNotes(req, res);
});

// create note
router.post(
  '/create',
  expressJwt({ secret: process.env.SECRET }),
  (req, res) => {
    createNote(req, res);
  }
);

// delete note
router.post(
  '/delete',
  expressJwt({ secret: process.env.SECRET }),
  (req, res) => {
    deleteNote(req, res);
  }
);

// update note
router.post(
  '/update',
  expressJwt({ secret: process.env.SECRET }),
  (req, res) => {
    updateNote(req, res);
  }
);

// get note
function getNotes(req, res) {
  const user_id = req.user.user.id;
  User.find({ _id: user_id }, 'notes', (err, notes) => {
    if (err) res.send(err);
    res.send(notes[0].notes);
  });
}

// create note
async function createNote(req, res) {
  const user_id = req.user.user.id;
  const note = new Note();
  const user = await User.findOne({ _id: user_id });
  user.notes.push(note);
  user.save((err, doc) => {
    if (err) return res.send(err);
    return res.send(doc);
  });
}

// delete note
async function deleteNote(req, res) {
  const user_id = req.user.user.id;
  const note_id = req.body.note_id;
  const user = await User.findOne({ _id: user_id });
  const index = await user.notes.findIndex(note => note._id == note_id);
  if (index === -1) return res.send('invalid note id');
  user.notes.splice(index, 1);
  user.save((err, doc) => {
    if (err) return res.send(err);
    return res.send(doc.notes);
  });
}

// update note
async function updateNote(req, res) {
  const user_id = req.user.user.id;
  const note_id = req.body.note_id;
  const title = req.body.title;
  const content = req.body.content;

  const user = await User.findOne({ _id: user_id });
  const index = await user.notes.findIndex(note => note._id == note_id);
  user.notes[index].title = title;
  user.notes[index].content = content;

  user.markModified('notes');
  user.save((err, doc) => {
    if (err) return res.send(err);
    return res.send(doc.notes);
  });
}

module.exports = router;
