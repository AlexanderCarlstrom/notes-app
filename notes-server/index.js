const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
const noteRoutes = require('./routes/note.routes');
const dotenv = require('dotenv');
dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to DB');
    }
  }
);

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, access-token, refresh-token'
  );
  next();
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/note', noteRoutes);

const port = 3000;
app.listen(port, () => console.log('Listening to port ' + port));
