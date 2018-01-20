let express = require('express');
let bcrypt = require('bcrypt');
let usersCollection = require('../app').users;
let router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('C:/Users/tienl/Desktop/sssc/public/html/register.html');
});

router.post('/', (req, res) => {
  usersCollection.findOne({email: req.body.email}, (err, result) => {
    if (err) { console.log(err); }
    if (result) {
      console.log(result);
      res.send('email exist');
    }
    else {
      let newUser = {};
      newUser.email = req.body.email;
      newUser.name = req.body.name;
      newUser.phone = req.body.phone;

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        newUser.password = hash;
        usersCollection.insertOne(newUser, (err, re) => {
          if (err) {console.log(err);}
          console.log(re.ops[0]);
          res.send('ok');
        });
      });
    }  
  });
});


module.exports = router;