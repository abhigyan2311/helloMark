var apiai = require('apiai');
var fs = require('fs');
const gTTS = require('gtts');
var mpg321 = require('mpg321');

var app = apiai("3e88fac3a4f14428b4ad2eea79eda44e");

var request = app.textRequest('What is the temperature', {
    sessionId: '433c0e9f-bf0a-4fad-8a26-de291a92cc9d'
});

function playAudio() {
    var proc = mpg321().file('outputAudio/say.mp3').exec();
    process.on('SIGINT', function(data) {
        process.exit();
    });
}

request.on('response', function(response) {
    if (response['result']['metadata']['intentName'] == 'temperature') {
        var temperature = fs.readFileSync('pi_modules/temperature.txt', "utf8");
        var tempJson = JSON.parse(temperature);
        console.log(tempJson['Temp']);
        var speechMsg = "Temperature is " + tempJson['Temp'] + " degree celsius and Humidity is " + tempJson['Hum'] + " percent";
        var gtts = new gTTS(speechMsg, 'en');
        gtts.save('outputAudio/say.mp3', function(err, result) {
            if (err) { throw new Error(err) }
            playAudio();
        });
    }
});

request.on('error', function(error) {
    console.log(error);
});

request.end();