var PubNub = require('pubnub')
var PythonShell = require('python-shell');

var pubnub = new PubNub({
    subscribeKey: "sub-c-383332aa-dcc0-11e6-b6b1-02ee2ddab7fe",
    publishKey: "pub-c-73cca4b9-e219-4f94-90fc-02dd8f018045",
    secretKey: "sec-c-YzcyZjI4NzEtNmUxMi00ZDc0LWI4ZGMtNGUyYmFlZmI1OTQ3",
    ssl: false
})

console.log("Listening...");

pubnub.addListener({
    message: function(m) {
        // handle message
        var channelName = m.channel; // The channel for which the message belon$
        var channelGroup = m.subscription; // The channel group or wildcard sub$
        var pubTT = m.timetoken; // Publish timetoken
        var msg = m.message; // The Payload
        console.log(msg);
        if(msg["device"]=="light" && msg["place"]=="bedroom"){
          switch(msg["state"]){
           case true : PythonShell.run('on.py', function (err) {
  if (err) throw err;
  console.log('Lights On!');
}); 
           case false : PythonShell.run('off.py', function (err) {
  if (err) throw err;
  console.log('Lights Off!');
});
          }
        }
    }
})


pubnub.subscribe({
    channels: ['switch'],
    withPresence: false
})
