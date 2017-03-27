var speech = require('google-speech-api');

var opts = {
    file: 'outputAudio/say.mp3',
    key: 'AIzaSyB-cvierfv4HWIU6d9l1_VRL5JMRtZhKYQ'
};

speech(opts, function(err, results) {
    console.log(results);
    // [{result: [{alternative: [{transcript: '...'}]}]}]
});