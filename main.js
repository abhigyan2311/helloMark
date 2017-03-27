var PubNub = require('pubnub');
var PythonShell = require('python-shell');
const gTTS = require('gtts');
var mpg321 = require('mpg321');
var apiai = require('apiai');
var fs = require('fs');

var pubnub = new PubNub({
    subscribeKey: "sub-c-383332aa-dcc0-11e6-b6b1-02ee2ddab7fe",
    publishKey: "pub-c-73cca4b9-e219-4f94-90fc-02dd8f018045",
    secretKey: "sec-c-YzcyZjI4NzEtNmUxMi00ZDc0LWI4ZGMtNGUyYmFlZmI1OTQ3",
    ssl: false
});

var app = apiai("3e88fac3a4f14428b4ad2eea79eda44e");

console.log("Ava Online!");

pubnub.addListener({
    message: function(m) {
        var channelName = m.channel;
        var channelGroup = m.subscription;
        var pubTT = m.timetoken;
        var msg = m.message;
        switch (channelName) {
            case 'switch':
                if (msg["device"] == "light" && msg["place"] == "bedroom") {
                    switch (msg["state"]) {
                        case true:
                            PythonShell.run('pi_modules/bedroomLightsOn.py', function(err) {
                                if (err) throw err;
                                console.log('Bedroom lights On!');
                            });
                            break;
                        case false:
                            PythonShell.run('pi_modules/bedroomLightsOff.py', function(err) {
                                if (err) throw err;
                                console.log('Bedroom lights Off!');
                            });
                            break;
                    }
                }
                break;
            case 'faceRecog':
                var speechMsg = msg[0] + ' is on the door.';
                var gtts = new gTTS(speechMsg, 'en');
                gtts.save('outputAudio/say.mp3', function(err, result) {
                    if (err) { throw new Error(err) }
                    playAudio();
                });
                break;
            case 'speechRecog':
                var speechRecogMsg = msg["text"];
                console.log(speechRecogMsg);
                var request = app.textRequest(speechRecogMsg, {
                    sessionId: '433c0e9f-bf0a-4fad-8a26-de291a92cc9d'
                });
                request.on('response', function(response) {
                    if (response['result']['source'] == "domains") {
                        var speechRespMsg = response['result']['fulfillment']['speech'];
                        var gtts = new gTTS(speechRespMsg, 'en');
                        gtts.save('outputAudio/say.mp3', function(err, result) {
                            if (err) { throw new Error(err) }
                            playAudio();
                        });
                    } else {
                        if (response['result']['metadata']['intentName'] == 'temperature') {
                            var temperature = fs.readFileSync('pi_modules/temperature.txt', "utf8");
                            var tempJson = JSON.parse(temperature);
                            var speechMsg = "Temperature is " + tempJson['Temp'] + " degree celsius and Humidity is " + tempJson['Hum'] + " percent";
                            var gtts = new gTTS(speechMsg, 'en');
                            gtts.save('outputAudio/say.mp3', function(err, result) {
                                if (err) { throw new Error(err) }
                                playAudio();
                            });
                        } else {
                            var speechRespMsg = response['result']['fulfillment']['speech'];
                            var gtts = new gTTS(speechRespMsg, 'en');
                            gtts.save('outputAudio/say.mp3', function(err, result) {
                                if (err) { throw new Error(err) }
                                playAudio();
                            });
                            if (response['result']['metadata']['intentName'] == 'switch') {
                                if (response['result']['parameters']['device'][0] != null && response['result']['parameters']['room'][0] != null && response['result']['parameters']['state'][0] != null) {
                                    switch (response['result']['parameters']['room'][0]) {
                                        case 'bedroom':
                                            switch (response['result']['parameters']['device'][0]) {
                                                case 'light':
                                                    switch (response['result']['parameters']['state'][0]) {
                                                        case 'on':
                                                            PythonShell.run('pi_modules/bedroomLightsOn.py', function(err) {
                                                                if (err) throw err;
                                                                console.log('Bedroom lights On!');
                                                            });
                                                            break;
                                                        case 'off':
                                                            PythonShell.run('pi_modules/bedroomLightsOff.py', function(err) {
                                                                if (err) throw err;
                                                                console.log('Bedroom lights Off!');
                                                            });
                                                            break;
                                                        default:
                                                            console.log("WOW");
                                                    }
                                                    break;
                                                case 'fan':
                                                    switch (response['result']['parameters']['state'][0]) {
                                                        case 'on':
                                                            PythonShell.run('pi_modules/bedroomFanOn.py', function(err) {
                                                                if (err) throw err;
                                                                console.log('Bedroom fan On!');
                                                            });
                                                            break;
                                                        case 'off':
                                                            PythonShell.run('pi_modules/bedroomFanOff.py', function(err) {
                                                                if (err) throw err;
                                                                console.log('Bedroom fan Off!');
                                                            });
                                                            break;
                                                        default:
                                                            console.log("WOW");
                                                    }
                                                    break;
                                                default:
                                                    console.log("OMG2");
                                            }
                                            break;
                                        case 'kitchen':
                                            switch (response['result']['parameters']['device'][0]) {
                                                case 'light':
                                                    switch (response['result']['parameters']['state'][0]) {
                                                        case 'on':
                                                            PythonShell.run('pi_modules/kitchenLightsOn.py', function(err) {
                                                                if (err) throw err;
                                                                console.log('Kitchen lights On!');
                                                            });
                                                            break;
                                                        case 'off':
                                                            PythonShell.run('pi_modules/kitchenLightsOff.py', function(err) {
                                                                if (err) throw err;
                                                                console.log('Kitchen lights Off!');
                                                            });
                                                            break;
                                                        default:
                                                            console.log("Wow");
                                                    }
                                                    break;
                                                default:
                                                    console.log("OMG2");
                                            }
                                            break;
                                        default:
                                            console.log("OMG");
                                    }
                                }
                            }
                        }
                    }
                });
                request.on('error', function(error) {
                    console.log(error);
                });
                request.end();
                break;
            default:

        }
    }
})

pubnub.subscribe({
    channels: ['switch', 'faceRecog', 'speechRecog'],
    withPresence: false
});

function playAudio() {
    var proc = mpg321().file('outputAudio/say.mp3').exec();
    process.on('SIGINT', function(data) {
        process.exit();
    });
}