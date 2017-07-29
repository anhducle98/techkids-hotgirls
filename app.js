const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.json');
const formidable = require('express-formidable');

const usersController = require('./Controller/usersController');
const imagesController = require('./Controller/imagesController');

mongoose.connect(config.ConnectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connect db success');
  }
});

let app = express();

app.use(formidable( { uploadDir : __dirname + '/Upload' }));

app.use((req, res, next) => {
  console.log('middleware convert field to body:', req.fields);
  console.log('File:', req.files);
  req.body = req.fields;
  next();
});

app.use('/api/user', usersController);
app.use('/api/image', imagesController);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/View/addUser.html');
})

app.listen(6969, () => {
  console.log('app listen on 6969');
})
