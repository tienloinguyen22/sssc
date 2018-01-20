let express = require('express');
let bcrypt = require('bcrypt');
let usersCollection = require('../app').users;
let router = express.Router();


// router.use((req, res, next) => {
//   console.log(req.method.toUpperCase() + ' Request to /login');
//   next();
// });

router.get('/', (req, res) => {
  res.sendFile('C:/Users/tienl/Desktop/sssc/public/html/login.html');
});

router.post('/', (req, res) => {
  usersCollection.findOne({email: req.body.email}, (err, result) => {
    if (err) { console.log(err); }
    if (result) {
      bcrypt.compare(req.body.password, result.password, (err, resu) => {
        if (err) {console.log(err);}
        res.send({'userID': result._id});
      });
    }
  });
});


module.exports = router;