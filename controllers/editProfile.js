let express = require('express');
let mongodb = require('mongodb');
let usersCollection = require('../app').users;
let bcrypt = require('bcrypt');
let router = express.Router();



router.get('/', (req, res) => {
  res.sendFile('C:/Users/tienl/Desktop/sssc/public/html/editProfile.html');
});

router.post('/get-profile', (req, res) => {
  usersCollection.findOne({_id: mongodb.ObjectID(req.body.id)}, (err, result) => {
    if (err) {console.log(err);}
    if (result) {
      let user = {
        email: result.email,
        phone: result.phone,
        name: result.name,
        img: result.img,
        facebook: result.facebook,
        instagram: result.instagram
      };
      res.send(JSON.stringify(user));
    }
  }
)});

router.post('/update-profile', (req, res) => {
  if (req.files) {
    let fileName = 'C:/Users/tienl/Desktop/sssc/public/assets/avatars/' + req.files.avatar.name;
    req.files.avatar.mv(fileName, (err) => {
      console.log(err);
    });
    usersCollection.updateOne({email: req.body.email}, {$set: {img: req.files.avatar.name}}, (err, result) => {
      if (err) {console.log(err);}
      console.log(fileName);
    });
  }

  if (req.body.password) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {console.log(err);}
      usersCollection.updateOne({email: req.body.email}, {$set: {password: hash}}, (err, result) => {
        if (err) {console.log(err);}
      });
    });
  }
  if (req.body.phone) {
    usersCollection.updateOne({email: req.body.email}, {$set: {phone: req.body.phone}}, (err, result) => {
      if (err) {console.log(err);}
    });
  }
  if (req.body.facebook) {
    usersCollection.updateOne({email: req.body.email}, {$set: {facebook: req.body.facebook}}, (err, result) => {
      if (err) {console.log(err);}
    });
  }
  if (req.body.instagram) {
    usersCollection.updateOne({email: req.body.email}, {$set: {instagram: req.body.instagram}}, (err, result) => {
      if (err) {console.log(err);}
    });
  }
});


module.exports = router;