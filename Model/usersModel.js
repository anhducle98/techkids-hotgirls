const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  avatar : {
    type : String
  },
  email : {
    type : String
  },
  active : {
    type : Boolean,
    default : true
  }
}, { timestamps: {}}, { collection : 'users'});

const usersModel = mongoose.model('users', usersSchema);

//TO DO
//Tạo 4 hàm cơ bản Create, Read, Update, Delete

//Create : tạo user
const CreateUser = (userInfo, callback) => {
  let newUser = {
    username : userInfo.username,
    password : userInfo.password,
    avatar : userInfo.avatar,
    email : userInfo.email
  }
  usersModel.create(newUser, (err, doc) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null,doc);
    }
  })
}
//Read : lấy user bằng id
const GetUserById = (id, callback) => {
  return usersModel.findOne({ _id : id}, (err, user) => {
    if (err) {
      callback(err);
    } else {
      let result = {
        username : user.username,
        email : user.email,
        avatar : user.avatar
      }
      callback(null, result);
    }
  })
}
//Update : update user bằng id
const UpdateUserById = (userId, userInfo, callback) => {
  UserModel.findOne({"_id": userId}, (err, user) => {
    if (err) {
      console.log("Error UpdateUserById");
      callback(err);
      return;
    }
    Object.assign(user, userInfo);
    user.save((err) => {
      if (err) {
        console.log("Error saving user");
        callback(err);
        return;
      }
      console.log("UpdateUserById succeeded");
      callback(null, user)
    });
  });
}
//Delete : delete user bằng id
const DeleteUserById = (userId, callback) => {
  UserModel.findById(userId, (err, user) => {
    if (err) {
      console.log("Error DeleteUserById");
      callback(err);
      return;
    }
    user.active = false;
    user.save((err) => {
      if (err) {
        console.log("Error saving user");
        callback(err);
        return;
      }
      console.log("DeleteUserById succeeded");
      callback(null);
    });
  });
}

module.exports = {
  CreateUser,
  GetUserById,
  UpdateUserById,
  DeleteUserById
}
