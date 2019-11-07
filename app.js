
var Bot = require('./src/Bot.js').Bot



// Bot.tweetText('this is tweet number ');
// setInterval(Bot.tweetText('this is tweet number'), 1000*20)

//Bot.getAccountCredentials();
//Bot.time(1, 10);

Bot.tweetInterval(60);
