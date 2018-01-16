var express = require('express');
var router = express.Router();
var config = require('../env');
var sensor = require('node-dht-sensor');
var mcpadc = require('mcp-spi-adc');

function getWeather() {
    return new Promise((resolve, reject) => {
        sensor.read(22, config.dht_pin, function(err, temperature, humidity) {
            if (!err) {
                console.log('temp: ' + temperature.toFixed(1) + '°C, ' + 'humidity: ' + humidity.toFixed(1) + '%');
                resolve({"temperature": temperature.toFixed(1), "humidity": humidity.toFixed(1)});
            } else {
                reject({"error": err});
            }
        });
    });
}

function getDry() {
    return new Promise((resolve, reject) => {
        var tempSensor = mcpadc.openMcp3008(7, {speedHz: 1350000}, function (err) {
            if(err) {
                reject({"error": err});
            } else {
                tempSensor.read(function (err, reading) {
                    if(!err) {
                        console.log("dryRate: " + reading.value);
                        resolve({"dryRate": reading.value});
                    } else {
                        reject({"error": err});
                    }
                });
            }
        });
    });
}

/* GET weather api */
router.get('/', function(req, res, next) {
    var temperature, humidity, dryRate;
    getWeather().then(weatherObject => {
        temperature = weatherObject.temperature;
        humidity = weatherObject.humidity;
        return getDry();
    }).then(dryRateObject => {
        dryRate = dryRateObject.dryRate;
        res.send({"temperature": temperature, "humidity": humidity, "dryRate": dryRate});
    }).catch(error => {
        res.send({"error": error});
    });
});

module.exports = router;
