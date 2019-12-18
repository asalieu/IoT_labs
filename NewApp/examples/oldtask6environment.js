var Thingy = require('../index');
const Hs100Api = require('hs100-api'); 

var last =false;
var enabled;

console.log('Reading Thingy environment sensors!');

let x = {
    'temp':0,
    'pres':0,
    'humi':0,
    'eco2':0,
    'tvoc':0
}

function onTemperatureData(temperature) {
    console.log('Temperature sensor: ' + temperature);
    x.temp = temperature;
    console.log(x);
    
    if(temperature<22)
     {
      console.log('Temperature is less  :' + temperature)

		
     }

    else if(temperature>22)
     {
      console.log('Temperature is above :' + temperature)
const client = new Hs100Api.Client(); 
	const lightplug = client.getPlug({host: '192.168.230.203'}); 
	lightplug.getInfo().then(console.log);
        last=!last; // Makes sure the plug is found.
 	lightplug.setPowerState(last); 
	
	
     }

}

function onPressureData(pressure) {
    console.log('Pressure sensor: ' + pressure);
    x.pres = pressure;

}

function onHumidityData(humidity) {
    console.log('Humidity sensor: ' + humidity);
    x.humi = humidity;
}

function onGasData(gas) {
    console.log('Gas sensor: eCO2 ' + gas.eco2 + ' - TVOC ' + gas.tvoc );
    x.eco2 = gas.eco2;
    x.tvoc = gas.tvoc;
}

function onColorData(color) {
    console.log('Color sensor: r ' + color.red +
                             ' g ' + color.green +
                             ' b ' + color.blue +
                             ' c ' + color.clear );
}

function onButtonChange(state) {
    if (state == 'Pressed') {
        if (enabled) {
            enabled = false;
            this.temperature_disable(function(error) {
                console.log('Temperature sensor stopped! ' + ((error) ? error : ''));
            });
            this.pressure_disable(function(error) {
                console.log('Pressure sensor stopped! ' + ((error) ? error : ''));
            });
            this.humidity_disable(function(error) {
                console.log('Humidity sensor stopped! ' + ((error) ? error : ''));
            });
            this.color_disable(function(error) {
                console.log('Color sensor stopped! ' + ((error) ? error : ''));
            });
            this.gas_disable(function(error) {
                console.log('Gas sensor stopped! ' + ((error) ? error : ''));
            });
        }
        else {
            enabled = true;
            this.temperature_enable(function(error) {
                console.log('Temperature sensor started! ' + ((error) ? error : ''));
            });
            this.pressure_enable(function(error) {
                console.log('Pressure sensor started! ' + ((error) ? error : ''));
            });
            this.humidity_enable(function(error) {
                console.log('Humidity sensor started! ' + ((error) ? error : ''));
            });
            this.color_enable(function(error) {
                console.log('Color sensor started! ' + ((error) ? error : ''));
            });
            this.gas_enable(function(error) {
                console.log('Gas sensor started! ' + ((error) ? error : ''));
            });
        }
    }
}

function onDiscover(thingy) {
  console.log('Discovered: ' + thingy);

  thingy.on('disconnect', function() {
    console.log('Disconnected!');
  });

  thingy.connectAndSetUp(function(error) {
    console.log('Connected! ' + error ? error : '');

    thingy.on('temperatureNotif', onTemperatureData);
    thingy.on('pressureNotif', onPressureData);
    thingy.on('humidityNotif', onHumidityData);
    thingy.on('gasNotif', onGasData);
    thingy.on('colorNotif', onColorData);
    thingy.on('buttonNotif', onButtonChange);

    
    thingy.temperature_interval_set(10000, function(error) {
        if (error) {
            console.log('Temperature sensor configure! ' + error);
        }
    });
    thingy.pressure_interval_set(10000, function(error) {
        if (error) {
            console.log('Pressure sensor configure! ' + error);
        }
    });
    thingy.humidity_interval_set(10000, function(error) {
        if (error) {
            console.log('Humidity sensor configure! ' + error);
        }
    });
    thingy.color_interval_set(10000, function(error) {
        if (error) {
            console.log('Color sensor configure! ' + error);
        }
    });
    thingy.gas_mode_set(1, function(error) {
        if (error) {
            console.log('Gas sensor configure! ' + error);
        }
    });

    enabled = true;

    thingy.temperature_enable(function(error) {
        console.log('Temperature sensor started! ' + ((error) ? error : ''));
    });
    thingy.pressure_enable(function(error) {
        console.log('Pressure sensor started! ' + ((error) ? error : ''));
    });
    thingy.humidity_enable(function(error) {
        console.log('Humidity sensor started! ' + ((error) ? error : ''));
    });
    thingy.color_enable(function(error) {
        console.log('Color sensor started! ' + ((error) ? error : ''));
    });
    thingy.gas_enable(function(error) {
        console.log('Gas sensor started! ' + ((error) ? error : ''));
    });
    thingy.button_enable(function(error) {
        console.log('Button started! ' + ((error) ? error : ''));
    });
  });
}
Thingy.discover(onDiscover);
