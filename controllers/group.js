let express = require('express');
let productLinesCollection = require('../app').productLines;
let router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  productLinesCollection.find({group: req.body.group}).toArray((err, arr) => {
    if (err) {console.log(err);}
    if (arr) {
      let data = JSON.stringify(arr);
      res.send(data);
    }
  });
});

module.exports = router;