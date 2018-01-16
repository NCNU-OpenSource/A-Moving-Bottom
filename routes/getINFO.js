var express = require('express');
var router = express.Router();
var config = require('../env');
var sensor = require('node-dht-sensor');
var mcpadc = require('mcp-spi-adc');

/* GET INFO of weather. */
router.get('/', function(req, res, next) {
    let hot = 0;
    let wet = 0;
    let rain = 1;
    sensor.read(22, config.dht_pin, function(err, temperature, humidity) {
      if (!err) {
          console.log('temp: ' + temperature.toFixed(1) + '°C, ' + 'humidity: ' + humidity.toFixed(1) + '%');
          hot = temperature.toFixed(1);
          wet = humidity.toFixed(1);
      }
    });
    var tempSensor = mcpadc.openMcp3008(7, {speedHz: 1350000}, function (err) {
        if (err) throw err;
        tempSensor.read(function (err, reading) {
            if (err) throw err;
            console.log(reading.value);
            rain = reading.value;
        });
    });
    let value = {
        "temperature": hot,
        "humidity": wet,
        "dry_rate": rain
    };
    res.send(value);
});

module.exports = router;