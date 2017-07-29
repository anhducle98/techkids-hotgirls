const usersModel = require('../Model/usersModel');
const express = require('express');
const Router = express.Router();

Router.post('/', (req, res) => {
  console.log('Files:',req.files);
  usersModel.CreateUser(req.body, (err, user) => {
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
  usersModel.GetUserById(req.params.id, (err, user) => {
    if (err) {
      res.status(500);
      res.send('Error');
    } else {
      res.status(200);
      res.send(user);
    }
  })
});

Router.put('/:id', (req, res) => {
  usersModel.UpdateUserById(req.params.id, req.body, (err, user) => {
    if (err) {
      res.status(500);
      res.send('Error');
    } else {
      res.status(200);
      res.send(user);
    }
  })
});

Router.delete('/:id', (req, res) => {
  usersModel.DeleteUserById(req.params.id, (err, user) => {
    if (err) {
      res.status(500);
      res.send('Error');
    } else {
      res.status(200);
      res.send(user);
    }
  })
});

module.exports = Router;
