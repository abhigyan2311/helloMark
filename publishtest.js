var PubNub = require('pubnub')
var PythonShell = require('python-shell');

var pubnub = new PubNub({
    subscribeKey: "sub-c-383332aa-dcc0-11e6-b6b1-02ee2ddab7fe",
    publishKey: "pub-c-73cca4b9-e219-4f94-90fc-02dd8f018045",
    secretKey: "sec-c-YzcyZjI4NzEtNmUxMi00ZDc0LWI4ZGMtNGUyYmFlZmI1OTQ3",
    ssl: false
})

function publishImgMessage(){
  pubnub.publish(
      {
          message: {
              "img": 1
          },
          channel: 'faceCapture',
          sendByPost: false, // true to send via post
          storeInHistory: false, //override default storage options
          meta: {
          } // publish extra meta with the request
      },
      function (status, response) {
          console.log(status);
      }
  );
}

publishImgMessage();
