const config = require('./config.json');
const mongoose = require('mongoose');
const usersModel = require('./Model/usersModel');
const imagesModel = require('./Model/imagesModel')

console.log('running test');
mongoose.connect(config.ConnectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connect db success');

    let userInfo = {
      username : 'long',
      password : '123456',
      avatar : 'http://',
      email : 'long@gmail.com'
    }

    let userId = '597c545d1984523781db66a3';
    usersModel.GetUserById(userId, (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
      }
    });
    //console.log('Test create user');
    //usersModel.CreateUser(userInfo, () => {});
    //
    let imageInfo = {
      'imageUrl': 'http://xxx.zzz',
      'posterId': userId
    };
    /*
    imagesModel.CreateImage(imageInfo, () => {});
  */
    let imageId = '597c5651ab629b39e966d9ee';
    imagesModel.UpdateImageById(imageId, {content: 'ahihi'}, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('update image done');
      }
    })
  }
});

/*
usersModel.GetUserById(userId).then(doc => {
  console.log('test get user');
  console.log(doc);
});
*/