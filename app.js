let express = require('express');
let bodyParser = require('body-parser');
let fileUpload = require('express-fileupload');
let mongodb = require('mongodb');
let app = express();


mongodb.MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) {console.log(err);}
  let db = client.db('sssc');
  let users = db.collection('users');
  let products = db.collection('products');
  let productLines = db.collection('productLines');
  module.exports.users = users;
  module.exports.products = products;
  module.exports.productLines = productLines;

  //Setting template engine
  app.set('view engine', 'ejs');
  app.set('views', './views');

  //Middleware
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(fileUpload());
  app.use(require('./controllers'));

  //Start server
  app.listen(8080, (err) => {
    if (err) { console.log(err); }
    console.log(`Listen on port 8080.`);
  });
});

