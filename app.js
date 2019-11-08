/*
    Aca se encuentra la clase principal que 
    es ejecutada en este mismo archivo

    Se utiliza una libreria para generar palabras, la
    documentacion de esta libreria esta en :
    https://github.com/words/an-array-of-english-words
*/
console.log('%c Bot SM95 init ! ', 'background: #222; color: #bada55');
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

    tweetUnsplashRandomImageFromWord(){
        Bot.tweetUnsplashRandomImageFromWord();
    }

    tweetPexelRandomImageFromWord(){
        Bot.tweetPexelRandomImageFromWord();
    }

}


var m = new Main();

/*
    Execute the bot actions 
*/


setInterval(function(){
    console.log('Executing retweet action, 5 min ')
    var funWords = words.filter(word => word.match(/^alien/i))
    var s = Math.floor(Math.random() * funWords.length)
    console.log(funWords[s])

     m.retweetFromWordFilter(funWords[s])
}, 300000); //  5 min

setInterval(function(){
    
    console.log('Executing retweet action, 8 min')
    var funWords = words.filter(word => word.match(/^game/i))
    var s = Math.floor(Math.random() * funWords.length)
    console.log(funWords[s])

     m.retweetFromWordFilter(funWords[s])
}, 480000); // 8 min


setInterval(function(){

    console.log('Executing retweet action, 11 min')
    var funWords = words.filter(word => word.match(/^hack/i))
    var s = Math.floor(Math.random() * funWords.length)
    console.log(funWords[s])

     m.retweetFromWordFilter(funWords[s])
}, 660000); // 11  min
    

setInterval(function(){
    console.log('Executing image post from PEXEL, 15 min ')
    m.tweetPexelRandomImageFromWord() // now is querying with the word: minimal
}, 900000) // 15 min

    


