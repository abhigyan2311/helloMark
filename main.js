var PubNub = require('pubnub')

var pubnub = new PubNub({
    subscribeKey: "sub-c-383332aa-dcc0-11e6-b6b1-02ee2ddab7fe",
    publishKey: "pub-c-73cca4b9-e219-4f94-90fc-02dd8f018045",
    ssl: false
})

pubnub.addListener({
    message: function(m) {
        // handle message
        var channelName = m.channel; // The channel for which the message belongs
        var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
        var pubTT = m.timetoken; // Publish timetoken
        var msg = m.message; // The Payload
        console.log(msg);
    }
})


pubnub.subscribe({
    channels: ['switch'],
    withPresence: false
})
