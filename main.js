var PubNub = require('pubnub')
var PythonShell = require('python-shell');

var pubnub = new PubNub({
    subscribeKey: "sub-c-383332aa-dcc0-11e6-b6b1-02ee2ddab7fe",
    publishKey: "pub-c-73cca4b9-e219-4f94-90fc-02dd8f018045",
    secretKey: "sec-c-YzcyZjI4NzEtNmUxMi00ZDc0LWI4ZGMtNGUyYmFlZmI1OTQ3",
    ssl: false
})

console.log("Ava Online!");

pubnub.addListener({
    message: function(m) {
        // handle message
        var channelName = m.channel; // The channel for which the message belon$
        var channelGroup = m.subscription; // The channel group or wildcard sub$
        var pubTT = m.timetoken; // Publish timetoken
        var msg = m.message; // The Payload
        switch (channelName){
          case 'switch':
              if(msg["device"]=="light" && msg["place"]=="bedroom"){
                  switch(msg["state"]){
                      case true : PythonShell.run('pi_modules/on.py', function (err) {
                            if (err) throw err;
                              console.log('Bedroom lights On!');
                            });
                  break;
                      case false : PythonShell.run('pi_modules/off.py', function (err) {
                            if (err) throw err;
                                console.log('Bedroom lights Off!');
                            });
                  break;
                }
              }
              break;
          case 'faceRecog':
                console.log(msg[0] + ' is on the door.');
                break;
          default:

        }
    }
})


pubnub.subscribe({
    channels: ['switch','faceRecog'],
    withPresence: false
})


function switchFunc(msg){

}

function faceRecogFunc(){
  console.log(msg);
}
