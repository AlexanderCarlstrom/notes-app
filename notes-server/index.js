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
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to DB');
    }
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/user', userRoutes);
app.use('/api/note', noteRoutes);

const port = 3000;
app.listen(port, () => console.log('Listening to port ' + port));
