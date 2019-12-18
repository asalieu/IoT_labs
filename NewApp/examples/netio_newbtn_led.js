var Thingy = require('../index');
const Hs100Api = require('hs100-api'); 
var led_color = 1;
console.log('Button and LED!');
var last=false;

function onButtonChange(state) {
    console.log('Button: ' + state);

    if (state == 'Pressed')
    {
        led_color = (led_color + 1) % 8;
        if (led_color == 0)
        {
            led_color = 1;
        }

        var led = {
            color : led_color,
            intensity : 20,
            delay : 1000
        };
        this.led_breathe(led, function(error){
            console.log('LED color change: ' + error);
        });

	

	const client = new Hs100Api.Client(); 
	const lightplug = client.getPlug({host: '192.168.230.203'}); 
	lightplug.getInfo().then(console.log);
        last=!last; // Makes sure the plug is found.
 	lightplug.setPowerState(last); 
	

    }
}

function onDiscover(thingy) {
  console.log('Discovered: ' + thingy);

  thingy.on('disconnect', function() {
    console.log('Disconnected!');
  });

  thingy.connectAndSetUp(function(error) {
    console.log('Connected! ' + error);
    thingy.on('buttonNotif', onButtonChange);
    thingy.button_enable(function(error) {
      
console.log('Button enabled! ' + error);
    });
  });
}

Thingy.discover(onDiscover);
