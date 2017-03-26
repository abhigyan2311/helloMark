var apiai = require('apiai');
var fs = require('fs');

var app = apiai("3e88fac3a4f14428b4ad2eea79eda44e");

var request = app.textRequest('What is the temperature', {
    sessionId: '433c0e9f-bf0a-4fad-8a26-de291a92cc9d'
});

request.on('response', function(response) {
    if (response['result']['metadata']['intentName'] == 'temperature') {
        var file = fs.readFileSync('pi_modules/temperature.txt', "utf8");
        console.log(file);
    }
});

request.on('error', function(error) {
    console.log(error);
});

request.end();