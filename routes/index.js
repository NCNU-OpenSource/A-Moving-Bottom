var express = require('express');
var router = express.Router();
var config = require('../env');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('view/index');
});

module.exports = router;
