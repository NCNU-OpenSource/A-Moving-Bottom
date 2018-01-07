var express = require('express');
var router = express.Router();
var config = require('../env');
var sensor = require('node-dht-sensor');

/* GET home page. */
router.get('/', function(req, res, next) {
  sensor.read(22, config.dht_pin, function(err, temperature, humidity) {
    if (!err) {
        console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
            'humidity: ' + humidity.toFixed(1) + '%'
        );
    }
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
