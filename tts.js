const gTTS = require('gtts');

var gtts = new gTTS('Keshav is on the door', 'en');

gtts.save('hello.mp3', function (err, result) {
  if(err) { throw new Error(err) }
  console.log('Success!');
});
