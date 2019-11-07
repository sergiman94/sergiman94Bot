/*
    *  THIS IS THE BOT OBJECT ( Bot = new Object())
    *  Here are the functional methods for this twitter bot
    *  Modify, delete or create new methods for your own purposes 
    *
    *  Author: Sergio Manrique AKA sergiman94

*/

var Twit = require('twit')
var Bot = new Object();
var stream = Twit.stream('user');

var T = new Twit({
    consumer_key: 'mZoR1qKJsTml19Wy6gTeTTeKt',
    consumer_secret: 'pORIlEeiNU2SGSKnqXrPuBrq4m5qpG2d3E0IbaSX07yz2p6Prh',
    access_token: '277798172-XM4qIAgLkfp2jXTW2gOLZkqiBIHuF7n0Hib4Rvlz',
    access_token_secret: 'ww02KZMHBceHwdsFgU9yvcAGZglB1VT9OUs1uOQYcbOvK',
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid.
})


Bot.tweetText = function (n) {

    var i = Math.floor(Math.random()*100);

    T.post('statuses/update', {
        status: `${n} ${i} `
    }, function (err, data, response) {
        
        //console.log(data)
        if (err){
            console.log('Can´t post tweet')
        }else{
            console.log(`tweet posted with id : ${data.id}`)
        }
    })
}

Bot.tweetInterval = function (n) {

    Bot.tweetText('this is number ')
    setInterval(function (){
        Bot.tweetText('This is number ')
    }, 1000*n)
}

Bot.getAccountCredentials = function () {

    T.get('account/verify_credentials', {
            skip_status: true
        })
        .catch(function (err) {
            console.log('caught error', err.stack)
        })
        .then(function (result) {
            // `result` is an Object with keys "data" and "resp".
            // `data` and `resp` are the same objects as the ones passed
            // to the callback.
            // See https://github.com/ttezel/twit#tgetpath-params-callback
            // for details.

            console.log('data', result.data);
        })
}

Bot.time = function (from, to) {

    let current = from;
    let timerId = setInterval(function () {
        console.log(current);
        
        if (current == to) {
            clearInterval(timerId);
        }
        current++;
    }, 1000);



}






exports.Bot = Bot;