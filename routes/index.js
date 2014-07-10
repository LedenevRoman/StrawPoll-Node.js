var database = require('../lib/database');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.get('/[0-9]+', function(req,res) {
   var s = req.url;
   var n = s.substring(1, s.length);
   database.getDataDB(n,res);
});


router.get('/[0-9]+/r', function(req,res) {
    var s = req.url;
    var data = [];
    data = s.split('/');
    console.log(req);
    res.end('RESULT');
});

router.post('/createPoll', require('./../lib/createPoll').post);

module.exports = router;
