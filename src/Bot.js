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
const words = require('an-array-of-english-words')
var fs = require('fs')
var str = '';
var play = require('play');


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
                        play.sound('./assets/Audio/anxious.mp3')
                        console.log('¡ Retweet Succesfully !')
                        console.log(' ')
                        console.log('------------------------------------------------')
                        console.log(' ')
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

/*
    tweet random image from word

*/

Bot.tweetUnsplashRandomImageFromWord = function (word) {

    var randomPage = Math.floor(Math.random * 4);

    /*
        Conectamos a unsplash API, unsplash es una API que coomparte imagenes
        en alta calidad, esta API permite consultar imagenes en base a una palabra,
        para mas informacion ir a https://unsplash.com/documentation 
    */

    var accesKey = '9e4768a0ce607defade1a5be59cb346ba2f862501a6e1e517226780f812c4ec9'
    var apiUrl = `https://api.unsplash.com/search/collections?page=1&query=${word}&client_id=${accesKey}`

    // Hacemos la peticion al servidor 
    request({
        url: apiUrl
    }, async function (err, res) {
        if (err) {
            console.log(err);
        } else {

            // Tomamos el body de todos los datos
            var search = JSON.parse(res.body)

            // Creamos un numero random de acuerdo al tamaño de resultados
            var random = Math.floor(Math.random() * parseInt(search["total"]));

            // Tomamos la uri donde se encuentra la imagen 
            
            var previewPhotosLength = search.results[random]['preview_photos'].length
            var previewPhotosRandom = Math.floor(Math.random() * parseInt(previewPhotosLength));
            
            var uri = search.results[random]['preview_photos'][previewPhotosRandom]['urls']['regular']
            var str = `${search.results[random]['preview_photos'][previewPhotosRandom]['id']}.png`
            var img = `./assets/images/${str}`;

            console.log(str);
            console.log(img)

            // Descargamos la imagen
            Bot.downloadImage(uri, str, function () {
                console.log('Image saved')
                
            })

            setTimeout(function () {Bot.postMedia(img, search.results[random]['preview_photos'][previewPhotosRandom]['id']);}, 8000);

    
            

        }
    })



}

/*
    funcion que descarga una imagen dado un uri y el nombre del archivo
*/

Bot.downloadImage = function (uri, filename, callback) {



    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(`./assets/${filename}`)).on('close', callback);
    });
}

/*
    funcion que postea una imagen de acuerdo al directorio
    donde se encuentre y la descripcion en texto de la imagen
*/

Bot.postMedia = function (path_of_image, alt_text) {

    var b64Content = fs.readFileSync(path_of_image, {
        encoding: 'base64'
    })


    // first we must post the media to Twitter
    T.post('media/upload', {
        media_data: b64Content
    }, function (err, data, response) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters
        var mediaIdStr = data.media_id_string
        var altText = `${alt_text}`
        var meta_params = {
            media_id: mediaIdStr,
            alt_text: {
                text: altText
            }
        }

        T.post('media/metadata/create', meta_params, function (err, data, response) {
            if (!err) {
                // now we can reference the media and post a tweet (media will attach to the tweet)
                var params = {
                    status: `${alt_text}`,
                    media_ids: [mediaIdStr]
                }

                T.post('statuses/update', params, function (err, data, response) {

                    if (err) {
                        console.log('Error posting the image')
                    } else {
                        
                        play.sound('./assets/Audio/anxious.mp3')
                        console.log('Image posted !')
                        console.log(' ')
                        console.log('------------------------------------------------')
                        console.log(' ')
                    }

                    //console.log(data)
                })
            }
        })
    })
}


Bot.tweetPexelRandomImageFromWord = function (word) {

    var randomPage = Math.floor(Math.random * 15);
    var re = new RegExp(word, 'i');
    var funWords = words.filter(word => word.match(/^minimal/i));
    //console.log(funWords)
    
    var s = Math.floor(Math.random() * funWords.length)
    console.log(funWords[s])

    /*
        Conectamos a PEXEL API, PEXEL es una API que coomparte imagenes
        en alta calidad, esta API permite consultar imagenes en base a una palabra,
        para mas informacion ir a https://www.pexels.com/api/documentation/
    */

    var data = {
        url : `http://api.pexels.com/v1/search?query=${funWords[s]}&per_page=100`,
        headers: {
          'Authorization': '563492ad6f91700001000001cf1c9e31775e4c2e911a7650b87eeddf'
        } 
     }

    // Hacemos la peticion al servidor 
    request(data, function (err, res) {
        if (err) {
            console.log(err);
        } else {

            // Tomamos el body de todos los datos
            var search = JSON.parse(res.body)

            var totalResults = search['total_results'];
            var randomNumber = Math.floor(Math.random()* search['photos'].length);

            var randomImage = search['photos'][randomNumber]
 
            console.log('Total results: ' + totalResults + ' ' +'Taken: ' + search['photos'].length)

            var uri = randomImage.src.medium
            var str = `${randomImage.id}.png`
            var img = `./assets/${str}`;

            console.log(str);
            console.log(img)

            // Descargamos la imagen
            Bot.downloadImage(uri, str, function () {
                console.log('Image saved')
                
            })

            setTimeout(function () {Bot.postMedia(img, `Photographer: ${randomImage.photographer}`);}, 8000);

        }
    })
}


Bot.tweetPinterestRandomImageFromWord = function () {

    var randomPage = Math.floor(Math.random * 15);

    /*
        Conectamos a PEXEL API, PEXEL es una API que coomparte imagenes
        en alta calidad, esta API permite consultar imagenes en base a una palabra,
        para mas informacion ir a https://www.pexels.com/api/documentation/
    */

    var data = {
        url : `https://api.pinterest.com/v1/`,
        headers: {
          'Authorization': '563492ad6f91700001000001cf1c9e31775e4c2e911a7650b87eeddf'
        } 
     }

    // Hacemos la peticion al servidor 
    request(data, function (err, res) {
        if (err) {
            console.log(err);
        } else {

            // Tomamos el body de todos los datos
            var search = JSON.parse(res.body)

            var totalResults = search['total_results'];

            
            // var randomImage = search['photos'][randomNumber]
            // console.log(search['page'])
            // console.log(randomImage.id)
                

            
            // console.log(totalResults)
            // console.log(search)
            

    
            

        }
    })



}



exports.Bot = Bot;