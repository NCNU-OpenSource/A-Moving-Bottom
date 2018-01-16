var express = require('express');
var router = express.Router();
var config = require('../env');
var sensor = require('node-dht-sensor');

/* GET weather api */
router.get('/', function(req, res, next) {
    var temp = 0;
    var wet = 0;
    var rainRate = 1;
    var weatherObj = {
        "temperature": temp,
        "humidity": wet,
        "dry_rate": rainRate
    };
//  res.send(weatherObj);
});

module.exports = router;
