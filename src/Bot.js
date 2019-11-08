/*
    *  THIS IS THE BOT OBJECT ( Bot = new Object())
    *  Here are the functional methods for this twitter bot
    *  Modify, delete or create new methods for your own purposes 
    *
    *  Author: Sergio Manrique AKA sergiman94

*/

var Twit = require('twit')
var Bot = new Object();
var idsWordFromDate = [];
var request = require('request');


var T = new Twit({
    consumer_key: 'y9M4tGS58mnByjopCQPxcfzkn',
    consumer_secret: 'Q6gztDxwr2ZuPUVe8gpCM8xs1OJ7rvkxmxJ6YDfsynaA7HzBBC',
    access_token: '1192367012774916096-epfHSqTK4FLkPi5GpXT9yzW9H61xpz',
    access_token_secret: 'r4JOgto3UKwxDhNcRd2c9zk8nMrUkkGWdXstCdB0TWURw',
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid.
})

/* 
    Esta funcion lo que hace es tomar una palabara
    desde una fecha, la fecha se debe escribir asi:
    2011-07-11, con los guiones de esa manera y todo
    pegado.

    Retorna un arreglo con los ids de esos tweets
*/

Bot.getIdWordFromDate = function (word, from, count) {

    T.get('search/tweets', {
        q: `${word} since:${from}`,
        count: count
    }, function (err, data, response) {

        for (let i = 0; i < data['statuses'].length; i++) {
            const element_id = data['statuses'][i].id;
            idsWordFromDate.push(element_id)
        }

        console.dir(idsWordFromDate);
        return idsWordFromDate
    })
}

/*
    Esta funcion hace retweet segun id o ids 
    debe ser un arreglo su parametro

*/

Bot.retweetWordFromDateByIds = function (word, from, count) {

    T.get('search/tweets', {
        q: `${word} since:${from}`,
        count: count
    }, function (err, data, response) {

        for (let x = 0; x < data['statuses'].length; x++) {
            const element = data['statuses'][x].id_str;
            console.log(element)

            T.post('statuses/retweet/:id', {
                id: element
            }, function (err, data, response) {

                if (err) {
                    console.log('Error retweeting');
                } else {
                    console.log('¡ Retweet Succesfully !')
                }

            })
        }
    })
}


/* 
    Retweetea tomando como parametro una palabra 

*/

Bot.retweetFromWordFilter = function (word) {

    T.get('search/tweets', {
        q: `${word}`,
        count: 1
    }, function (err, data, response) {

        if (err) {
            console.log('Error retweeting');
        } else {
            for (let x = 0; x < data['statuses'].length; x++) {
                const element = data['statuses'][x].id_str;
                console.log(element)

                T.post('statuses/retweet/:id', {

                    id: element

                }, function (err, data, response) {

                    if (err) {
                        console.log('Error retweeting');
                    } else {
                        console.log('¡ Retweet Succesfully !')
                    }

                })
            }
        }
    })

}

/* 
    ¡ Esta Funcion postea un tweet !
*/

Bot.tweetText = function (n) {

    var i = Math.floor(Math.random() * 100);

    T.post('statuses/update', {
        status: `${n}  `
    }, function (err, data, response) {

        //console.log(data)
        if (err) {
            console.log('Can´t post tweet')
        } else {
            console.log(`tweet posted with id : ${data.id}`)
        }
    })
}

/* 
    Esta Funcion postea un tweet en intervalos de tiempo
*/

Bot.tweetInterval = function (n) {

    Bot.tweetText('this is number ')
    setInterval(function () {
        Bot.tweetText('This is number ')
    }, 1000 * n)
}

/* 
    Esta funcion muestra los datos de usuario (nuestro usuario)
*/

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

/* 
        Eata funcion cuenta cada segundo, desde un numero hasta otro
*/

Bot.timerCounter = function (from, to) {

    let current = from;
    let timerId = setInterval(function () {
        console.log(current);

        if (current == to) {
            clearInterval(timerId);
        }
        current++;
    }, 1000);
}

/* 
    Toma tweets en tiempo real dependiendo de la palabra
*/

Bot.getRealTimeTweetsByWord = function (word) {


    //filter the public stream by english tweets containing `#apple`

    var stream = T.stream('statuses/filter', {
        track: `${word}`,
        language: 'en'
    })

    stream.on('tweet', function (tweet) {
        console.log(tweet)
    })

}

Bot.downloadImageFromLink = function (word) {

    var randomPage = Math.floor(Math.random * 3);


    var accesKey = '9e4768a0ce607defade1a5be59cb346ba2f862501a6e1e517226780f812c4ec9'
    var apiUrl = `https://api.unsplash.com/search/photos?page=${randomPage}&query=minimal&client_id=${accesKey}`

    request({
        url: apiUrl
    }, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            var search = JSON.parse(res.body)
            //console.log(search.results[1]);
            var random = Math.floor(Math.random() * parseInt(search.results.length));
            //console.log(random);

            var uri = search.results[random]['urls']['regular']

            var file_id = console.log(search.results[random]['id'])

            Bot.downloadImage(uri, `${search.results[random]['id']}.png`, function(){
                console.log('Image saved')
            })


        }
    })

    //curl https://api.unsplash.com/search/photos?query=minimal&client_id=9e4768a0ce607defade1a5be59cb346ba2f862501a6e1e517226780f812c4ec9


    // var fs = require('fs'),
    //     request = require('request');

    // var download = function (uri, filename, callback) {
    //     request.head(uri, function (err, res, body) {
    //         console.log('content-type:', res.headers['content-type']);
    //         console.log('content-length:', res.headers['content-length']);

    //         request(uri).pipe(fs.createWriteStream(`./assets/${filename}`)).on('close', callback);
    //     });
    // };

    // download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function () {
    //     console.log('done');
    // });

}

Bot.downloadImage = function (uri, filename, callback) {

    var fs = require('fs')

    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(`./assets/${filename}`)).on('close', callback);
    });
}

exports.Bot = Bot;