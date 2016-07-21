# twitter-beautifier

A short library used to beautify a raw Twitter API json response to a usable html snippet

```javascript
var Twitter = require('twitter');
var TwitterBeautifier = require('twitter-beautifier');

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
  res.render('index', {tweet: TwitterBeautifier(tweets)});
});
```

## Installation

`npm install twitter-beautifier`

## Quick start

Use twitter node to use it : [https://www.npmjs.com/package/twitter](https://www.npmjs.com/package/twitter)

## Examples

hashtags
```javascript
var TwitterBeautifier = require('twitter-beautifier');
var tweet = {
  text: 'hello world #javascript',
  entities: { hashtags: [{ text: 'javascript' }] }
};
TwitterBeautifier(tweet);
/** hello world <a href="https://www.twitter.com/hashtag/javascript?&src=hash" target="_blank">&#35;javascript</a> */
```

User mentions
```javascript
var TwitterBeautifier = require('twitter-beautifier');
var tweet = {
  text: 'hello @herzuull',
  entities: { user_mentions: [{ screen_name: 'herzuull' }] }
};
TwitterBeautifier(tweet);
/** hello <a href="https://www.twitter.com/herzuull" target="_blank">&#64;herzuull</a> */
```
URLS transformation
```javascript
var TwitterBeautifier = require('twitter-beautifier');
var tweet = {
  text: 'hello world to https://t.co/2Prjsq8uck',
  entities: {
    urls: [{
      url: 'https://t.co/2Prjsq8uck',
      expanded_url: 'http://bit.ly/1RYcbV7',
      display_url: 'bit.ly/1RYcbV7'
    }]
  }
};
TwitterBeautifier(tweet);
/** hello world to <a href="http://bit.ly/1RYcbV7" target="_blank">bit.ly/1RYcbV7</a>*/

```

URLS with images
```javascript
var TwitterBeautifier = require('twitter-beautifier');
var tweet = {
  text: 'Here is an image https://t.co/qYKfvzeEb6',
  entities: {
    media: [{
      url: 'https://t.co/qYKfvzeEb6',
      expanded_url: 'http://twitter.com/RNC_France/status/754966450087927808/photo/1',
      display_url: 'pic.twitter.com/qYKfvzeEb6',
      media_url_https: 'https://pbs.twimg.com/media/Cnot-5fVUAAnaHv.jpg'
    }]
  }
};
TwitterBeautifier(tweet);
/** Here is an image <img src="https://pbs.twimg.com/media/Cnot-5fVUAAnaHv.jpg" /> */
```


## Contributors

Maintained by [@herzuull](https://github.com/herzuull)
