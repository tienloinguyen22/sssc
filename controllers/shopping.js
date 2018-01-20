



let express = require('express');
let productsCollection = require('../app').products;
let productLinesCollection = require('../app').productLines;
let usersCollection = require('../app').users;
let mongodb = require('mongodb');
let router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('C:/Users/tienl/Desktop/sssc/public/html/shopping.html');
});

router.get('/:id', (req, res) => {
  res.sendFile('C:/Users/tienl/Desktop/sssc/public/html/detail.html');
});

router.post('/get-product', (req, res) => {
  console.log('ok');
  let data = [];
  productsCollection.find({productLine: req.body.productLineID}).toArray((err, arr) => {
    if (err) {console.log(err);}
    if (arr) {
      for (let item of arr) {
        productLinesCollection.findOne({_id: mongodb.ObjectID(item.productLine)}, (err, result) => {
          if (err) {console.log(err);}
          if (result) {
            item.productLine = result.name;
            item.group = result.group;
            data.push(item);     
          }
        });
      }
    }
  });
});

module.exports = router;