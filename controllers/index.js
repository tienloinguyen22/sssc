let express = require('express');
let router = express.Router();


router.get('/', (req, res) => {
  console.log(req.method.toUpperCase() + ' Request to /');
  res.sendFile('C:/Users/tienl/Desktop/sssc/public/html/index.html');
});

router.use('/login', require('./login'));

router.use('/register', require('./register'));

router.use('/group', require('./group'));

router.use('/edit-profile', require('./editProfile'));

router.use('/shopping', require('./shopping'));

router.use('/sell', (req, res) => {
  res.sendFile('C:/Users/tienl/Desktop/sssc/public/html/sell.html');
});


module.exports = router;