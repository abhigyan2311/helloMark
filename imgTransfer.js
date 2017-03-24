var AWS = require('aws-sdk');
var fs = require('fs');
var PubNub = require('pubnub')
var PythonShell = require('python-shell');

var pubnub = new PubNub({
    subscribeKey: "sub-c-383332aa-dcc0-11e6-b6b1-02ee2ddab7fe",
    publishKey: "pub-c-73cca4b9-e219-4f94-90fc-02dd8f018045",
    secretKey: "sec-c-YzcyZjI4NzEtNmUxMi00ZDc0LWI4ZGMtNGUyYmFlZmI1OTQ3",
    ssl: false
})

AWS.config.update({ accessKeyId: 'AKIAIETQQUOICCYPDVZA', secretAccessKey: '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' });

fs.readFile('piCam/capturedImg.jpg', function (err, data) {
  if (err) { throw err; }
  var base64data = new Buffer(data, 'binary');
  var s3 = new AWS.S3();
  s3.putObject({
    Bucket: 'hellomark',
    Key: 'capturedImg.jpg',
    Body: base64data,
    ACL: 'public-read'
  },function (resp) {
    publishImgMessage();
    console.log('Successfully uploaded package.');
  });
});

function publishImgMessage(){
  pubnub.publish(
      {
          message: {
              "img": 1
          },
          channel: 'faceCapture',
          sendByPost: false,
          storeInHistory: false,
          meta: {}
      },
      function (status, response) {
          console.log(status);
      }
  );
}
