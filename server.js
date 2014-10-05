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
  res.status(200).json({status: 'Time to drink, API is UP'});
});

router.post('/', function(req, res) {
  res.status(200).json({status: 'Time to drink, API is UP'});
});

router.get('/task/new', function(req, res) {
  var tasks_helper = require('./lib/tasks.js');

  tasks_helper.getNewBTTask().then(
    function(new_task) {
        console.log(new_task.id);
        console.log(new_task.get('for_item'));
        res.status(200).json({task_id: new_task.id, item_name: new_task.get('for_item').get('item_number').toString()});
    },
    function(error) {
        res.status(200).json({item_name: '-1'});
    }
  );
});

router.post('/task/complete', function(req, res) {
  var tasks_helper = require('./lib/tasks.js');
  var task_id = req.query.task_id;

  tasks_helper.completeBTTask(task_id).then(
    function(task_object) {
      res.status(200).json({response: 'Sucessfully completed task: ' + task_object.id});
    },
    function(error) {
      res.status(200).json({error: 'Error while completing task ' + error +  ' ' + JSON.stringify(error)});
    }
  );
});

router.get('/braintree/token', function(req, res) {
  var tasks_helper = require('./lib/tasks.js');

  tasks_helper.getBrainTreeClientToken().then(
    function(client_token) {
      res.status(200).json({braintree_client_token: client_token});
    },
    function(error) {
      res.status(200).json({error: 'Error while completing task ' + error +  ' ' + JSON.stringify(error)});
    }
  );
});

// Register Routes
app.use('/', router);

// Register Error Handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({error: 'API is down, sobriety...'});
});

var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});