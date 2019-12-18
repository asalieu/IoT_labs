var express = require("express");
var app = express();
var cors = require('cors')

app.use(cors());
app.options('*', cors());

console.log('Reading Fake Thingy environment sensors!');

// let rand = 28;//Math.random() * (31 - 28) + 28;
// console.log(rand);

function getRand(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

let x = {
    'temp':getRand(),
    //'tempTime': Date.now(),
    'pres':0,
    'humi':0,
    'eco2':0,
    'tvoc':0
}

app.get("/", function(req, res) {
    // rand = Math.random() * (31 - 28) + 28;
    x['temp'] = getRand(28, 31);
    x['pres'] = getRand(395,430);
    x['humi'] = getRand(20,21);
    res.send(x);
});
app.listen(3002, function() {
    console.log("listening on port 3002!");
});
