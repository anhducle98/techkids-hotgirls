const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const imagesSchema = new Schema({
  imageUrl : {
    type : String,
    require : true
    //TO DO : Phai co dinh dang la http://
  },
  posterId : {
    type : ObjectId
  },
  view : {
    type : Number,
    default : 0
  },
  likes : {
    type : [{
      type : ObjectId
    }]
  },
  content : {
    type : String
  },
  title : {
    type : String
  },
  tag : {
    type : [{
      type : String
    }]
  }
}
);

const imagesModel = mongoose.model('images', imagesSchema);

const CreateImage = (imageInfo, callback) => {
  let newImage = imageInfo;
  imagesModel.create(newImage, (err, doc) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null,doc);
    }
  })
}
//Read : lấy image bằng id
const GetImageById = (id, callback) => {
  return imagesModel.findOne({ _id : id}, (err, image) => {
    if (err) {
      callback(err);
    } else {
      callback(null, image);
    }
  })
}
//Update : update Image bằng id
const UpdateImageById = (imageId, imageInfo, callback) => {
  imagesModel.findOne({"_id": imageId}, (err, image) => {
    if (err) {
      console.log("Error UpdateImageById");
      callback(err);
      return;
    }
    Object.assign(image, imageInfo);
    image.save((err) => {
      if (err) {
        console.log("Error saving image");
        callback(err);
        return;
      }
      console.log("UpdateImageById succeeded");
      callback(null, image);
    });
  });
}
//Delete : delete user bằng id
const DeleteImageById = (imageId) => {
  imagesModel.findOneAndRemove({_id: imageId} , (err, image) => {
    if (err) {
      console.log("Error DeleteImageById");
      callback(err);
      return;
    }
    console.log("DeleteImageById succeeded");
    callback(err);
  });
};

module.exports = {
  CreateImage,
  GetImageById,
  UpdateImageById,
  DeleteImageById
}
