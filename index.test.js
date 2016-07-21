var expect = require('chai').expect;
var beautifier = require('./index');

describe('twitter beautifier', function() {
  it('should convert #tags to anchor links', function() {
    var tweet = {
      text: 'hello world #javascript',
      entities: { hashtags: [{ text: 'javascript' }] }
    };
    var actual = beautifier(tweet);
    var expected = 'hello world <a href="https://www.twitter.com/hashtag/javascript?&src=hash" target="_blank">&#35;javascript</a>';
    expect(actual).to.equal(expected);
  });

  it('should convert @mentions to anchor links', function() {
    var tweet = {
      text: 'hello @herzuull',
      entities: { user_mentions: [{ screen_name: 'herzuull' }] }
    };
    var actual = beautifier(tweet);
    var expected = 'hello <a href="https://www.twitter.com/herzuull" target="_blank">&#64;herzuull</a>';
    expect(actual).to.equal(expected);
  });

  it('should convert https://t.co/2Prjsq8uck to anchor links', function() {
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
    var actual = beautifier(tweet);
    var expected = 'hello world to <a href="http://bit.ly/1RYcbV7" target="_blank">bit.ly/1RYcbV7</a>';
    expect(actual).to.equal(expected);
  });

  it('should display an image https://t.co/2Prjsq8uck', function() {
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
    var actual = beautifier(tweet);
    var expected = 'Here is an image <img src="https://pbs.twimg.com/media/Cnot-5fVUAAnaHv.jpg" />';
    expect(actual).to.equal(expected);
  });
});
