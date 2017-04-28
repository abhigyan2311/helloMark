// var speech = require('google-speech-api');

// var opts = {
//     file: 'outputAudio/say.mp3',
//     key: 'AIzaSyB-cvierfv4HWIU6d9l1_VRL5JMRtZhKYQ'
// };

// speech(opts, function(err, results) {
//     console.log(results);
//     // [{result: [{alternative: [{transcript: '...'}]}]}]
// });

var PubNub = require('pubnub');

var pubnub = new PubNub({
    subscribeKey: "sub-c-383332aa-dcc0-11e6-b6b1-02ee2ddab7fe",
    publishKey: "pub-c-73cca4b9-e219-4f94-90fc-02dd8f018045",
    secretKey: "sec-c-YzcyZjI4NzEtNmUxMi00ZDc0LWI4ZGMtNGUyYmFlZmI1OTQ3",
    ssl: false
});

pubnub.addListener({
    message: function(m) {
        var channelName = m.channel;
        var channelGroup = m.subscription;
        var pubTT = m.timetoken;
        var msg = m.message;
        console.log(msg);
    }
});

pubnub.subscribe({
    channels: ['lockDown'],
    withPresence: false
});