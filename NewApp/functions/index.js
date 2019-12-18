const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

const database = admin.database();

async function onSensorLoad()  {
    var date = new Date()
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if(month < 10){
        month = "0" + month;
    }
    if(date < 10){
        date = "0" + date;
    }
    var day = date.getDate();
    var timestamp = year + "-" + month + "-" + day;

    console.log(timestamp,"timepstamp line");
    var dbRef = database.ref("thingy/d271d77a7e4b/" + timestamp);
    // var dbRef = database.ref("thingy/f3d50ed48fd7/" + "2018-12-28");
    var allDataRef = dbRef.once('value');
    console.log(allData);
    var currentDataRef = dbRef.limitToLast(1).once('value');
    var currentData = await currentDataRef.then( snapshot => {
        let items = {};
        snapshot.forEach(item => {
            items = item
        })
        console.log(items);
        return items;
    }).catch((error) => {
        console.log(error)
    });
    var allData = await allDataRef.then( snapshot => {
        let items = snapshot.val();
        console.log(items);
        return items;
    }).catch((error) => {
        console.log(error)
    });

    return {currentData, allData};
}

exports.getSensorValue = functions.https.onRequest(async (req, res) => {

    let sensorData = await onSensorLoad();
     cors(req,res, () => {
        res.status(200).json(sensorData);
    })

});

exports.getFirebaseVideoURL = functions.https.onRequest(async (req,res) => {
    let dbRef = database.ref("videoDownloadLink").once("value");
    let snapshot = await dbRef.then((snapshot) => {
        return snapshot.val();
    }).catch((e) => {
        console.log(e)
    })
    cors(req,res, () => {
        res.status(200).json(snapshot);
    })
});

exports.getSmartPlugState = functions.https.onRequest(async(req,res) => {
    var dbRef = database.ref("hsAPI100").once("value");
    let snapshot = await dbRef.then((snapshot) => {
        return snapshot.val();
    }).catch((e) => {
        console.log(e)
    })
    cors(req,res, () => {
        res.status(200).json(snapshot);
    })
})
