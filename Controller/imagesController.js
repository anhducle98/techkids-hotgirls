const imagesModel = require('../Model/imagesModel');
const express = require('express');
const Router = express.Router();

Router.post('/', (req, res) => {
  console.log('Files:',req.files);
  imagesModel.CreateImage(req.body, (err, image) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.send('Error');
    } else {
      res.status(201);
      res.send('Account created');
    }
  })
});

Router.get('/:id', (req, res) => {
  imagesModel.GetImageById(req.params.id, (err, image) => {
    if (err) {
      res.status(500);
      res.send('Error');
    } else {
      res.status(200);
      res.send(image);
    }
  })
});

Router.put('/:id', (req, res) => {
  imagesModel.UpdateImageById(req.params.id, req.body, (err, image) => {
    if (err) {
      res.status(500);
      res.send('Error');
    } else {
      res.status(200);
      res.send(image);
    }
  })
});

Router.delete('/:id', (req, res) => {
  imagesModel.DeleteImageById(req.params.id, (err, image) => {
    if (err) {
      res.status(500);
      res.send('Error');
    } else {
      res.status(200);
      res.send(image);
    }
  })
});

module.exports = Router;
