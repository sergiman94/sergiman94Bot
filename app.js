/*
    Aca se encuentra la clase principal que 
    es ejecutada en este mismo archivo
*/

var Bot = require('./src/Bot.js').Bot
const words = require('an-array-of-english-words')

class Main {

    constructor() {

    }

    /*
        Esta funcion retwitea los tweets de acuerdo a una palabra
        que fue tweeteada desde el 2011, count es para el numero de
        tweets que se quieren retwitear 
    */
    retweetByWordAndDate(word, date, count) {
        Bot.retweetWordFromDateByIds(word, date, count)

        // way to execute
        //m.retweetByWordAndDate('NASA', '2019-01-01', 1)
    }

    /* 
    
    Retweetea en intervalos de tiempo dada una fecha random de 1900 a 1999
    tomando como parametro una palabra 

    */

    retweetFromWordFilter(word) {
        Bot.retweetFromWordFilter(word)

        // retweet from word in intervals of time

        // setInterval(function () {

        //     var funWords = words.filter(word => word.match(/^fun/i))
        //     var s = Math.floor(Math.random() * 100)
        //     console.log(funWords[s])
        
        //     m.retweetFromWordFilter(funWords[s])
        
        // }, 60000)
    }

    /* 
    
        Twittea al usuario al momento de seguirnos

    */

    tweetBackWhenFollowedStream() {

        Bot.tweetBackWhenFollowedStream();
    }


    /* 
        Toma tweets en tiempo real dependiendo de la palabra
    */

    getRealTimeTweetsByWord(word){
        Bot.getRealTimeTweetsByWord(word)
    }

    downloadImageFromLink(){
        Bot.downloadImageFromLink ();
    }

}


var m = new Main();

/*
    Execute the bot actions 
*/

//m.getRealTimeTweetsByWord('#Apple'); 
m.downloadImageFromLink();

