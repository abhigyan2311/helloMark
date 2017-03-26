var PubNub = require('pubnub')
var PythonShell = require('python-shell');
const gTTS = require('gtts');
var mpg321 = require('mpg321');

var pubnub = new PubNub({
    subscribeKey: "sub-c-383332aa-dcc0-11e6-b6b1-02ee2ddab7fe",
    publishKey: "pub-c-73cca4b9-e219-4f94-90fc-02dd8f018045",
    secretKey: "sec-c-YzcyZjI4NzEtNmUxMi00ZDc0LWI4ZGMtNGUyYmFlZmI1OTQ3",
    ssl: false
})

console.log("Ava Online!");
var speechMsg = "Ava Online"
var gtts = new gTTS(speechMsg, 'en');
gtts.save('outputAudio/say.mp3', function(err, result) {
    if (err) { throw new Error(err) }
    playAudio();
});

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
                            PythonShell.run('pi_modules/on.py', function(err) {
                                if (err) throw err;
                                console.log('Bedroom lights On!');
                            });
                            break;
                        case false:
                            PythonShell.run('pi_modules/off.py', function(err) {
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
            default:

        }
    }
})

pubnub.subscribe({
    channels: ['switch', 'faceRecog'],
    withPresence: false
})

function playAudio() {
    var proc = mpg321().file('outputAudio/say.mp3').exec();
    process.on('SIGINT', function(data) {
        process.exit();
    });
}