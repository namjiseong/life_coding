var express = require('express');
var router = express.Router();
var topic = require('../lib/topic');
var path = require('path');
router.get('/', function(request, response) { 
    topic.home(request, response);
});

module.exports = router;
