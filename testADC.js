var mcpadc = require('mcp-spi-adc');

var tempSensor = mcpadc.openMcp3008(7, {speedHz: 1350000}, function (err) {
    if (err) throw err;

    setInterval(function () {
      tempSensor.read(function (err, reading) {
        if (err) throw err;
        console.log(reading.value);
      });
    }, 1000);
  });
