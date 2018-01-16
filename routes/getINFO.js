var express = require('express');
var router = express.Router();
var config = require('../env');
var sensor = require('node-dht-sensor');
var mcpadc = require('mcp-spi-adc');

/* GET weather api */
router.get('/', function(req, res, next) {
    var temp = 0;
    var wet = 0;
    var dryRate = 1;
    sensor.read(22, config.dht_pin, function(err, temperature, humidity) {
        if (!err) {
            console.log('temp: ' + temperature.toFixed(1) + '°C, ' + 'humidity: ' + humidity.toFixed(1) + '%');
            temp = temperature.toFixed(1);
            wet = humidity.toFixed(1);
        }
      });
    var tempSensor = mcpadc.openMcp3008(7, {speedHz: 1350000}, function (err) {
        if (err) throw err;
        tempSensor.read(function (err, reading) {
            if (err) throw err;
            console.log(reading.value);
            dryRate = reading.value;
        });
    });
    res.send({"temperature": temp, "humidity": wet, "dryRate": dryRate});
});

module.exports = router;
