var apiai = require('apiai');

var app = apiai("3e88fac3a4f14428b4ad2eea79eda44e");

var request = app.textRequest('Hey Mark', {
    sessionId: '433c0e9f-bf0a-4fad-8a26-de291a92cc9d'
});

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
