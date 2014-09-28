var express = require('express');
var app = express();

var port = process.env.PORT || 5000

var router = express.Router();

// Middleware
router.use(function(req, res, next) {
  //console.log(req);
  next();
});

// Adding CORS Header
router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

router.get('/', function(req, res) {
  res.status(200).json({status: 'Maruchi you are a fuck'});
});

router.post('/', function(req, res) {
  res.status(200).json({status: 'Maruchi you are a fuck'});
});

// Register Routes
app.use('/', router);

// Register Error Handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({error: 'something broke!'});
});

var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});