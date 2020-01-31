const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const user = require('./routes/user.routes');
const app = express();

const db_url = 'mongodb://127.0.0.1:27017/notes-db';
let mongoDB = process.env.MONGODB_URI || db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', user);

const port = 1234;
app.listen(port, () => {
  console.log('server is running on port ' + port);
});
