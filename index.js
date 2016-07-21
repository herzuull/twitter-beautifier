/**
 * @author herzuull (Kévin Goualch - herzuull@gmail.com)
 */

/**
 * Give a twitter json response from Twitter node API to format the response to pure HTML snippet
 * @param {json} tweet - The response from Twitter Node JS API
 * @returns {html} - The formated html to display
 */
module.exports = function(tweet) {
  /** affect to temporary variables entities and text */
  var entities = tweet && tweet.entities;
  var tweetContent = tweet && tweet.text;

/** check if there are user mentions and transform them */
  tweetContent = entities.user_mentions ? mentionsHashtags(tweetContent, entities.user_mentions, 'user_mentions') : tweetContent;
/** check if there are user mentions and transform them */
  tweetContent = entities.hashtags ? mentionsHashtags(tweetContent, entities.hashtags, 'hashtags') : tweetContent;
/** check if there are user mentions and transform them */
  tweetContent = entities.urls ? urls(tweetContent, entities.urls, 'url') : tweetContent;
/** check if there are user mentions and transform them */
  tweetContent = entities.media ? urls(tweetContent, entities.media, 'media') : tweetContent;
/** return tweetContent */
  return tweetContent;
};

/** Configuration for each entities available in a tweet */
var CONFIG = {
  hashtags: {
    tagISO: '#',
    key: 'text',
    url: '<a href="https://www.twitter.com/hashtag/__item__?&src=hash" target="_blank">&#35;__item__</a>'
  },
  user_mentions: {
    tagISO: '@',
    key: 'screen_name',
    url: '<a href="https://www.twitter.com/__item__" target="_blank">&#64;__item__</a>'
  },
  urls: {
    url: 'url',
    expandedUrl: 'expanded_url',
    displayUrl: 'display_url',
    urlPattern: '<a href="__expandedurl__" target="_blank">__displayurl__</a>',
    imgPattern: '<img src="__expandedurl__" />'
  }
};

/**
 * transform the tweet text with an itemsList (entities for hashtags and user mentions)
 * @param {string} content - transformed text from the tweet
 * @param {array} itemsList - an array of each entities available for the targeted entity
 * @param {string} type - the type of the content to be analysed
 */
function mentionsHashtags(content, itemsList, type) {
  /** Set config from CONFIG constant set with the type used */
  var config = CONFIG[type];
  /** for each entity available, use it to replace in the pattern url
  with the specific tag __item__
  */
  itemsList.forEach(function(item) {
    content = content
    /** ... then replace the text inside the the tweet content with the
    formated url and its html counterpart */
    .replace(config.tagISO + item[config.key],
      /** first step : replace the __item__ with the correct value of the tag */
      config.url.replace(/__item__/gi, item[config.key]));
  });
  return content;
}

/**
 * transform the tweet text with an itemsList (entities for urls and medias)
 * @param {string} content - transformed text from the tweet
 * @param {array} itemsList - an array of each entities available for the targeted entity
 * @param {string} type - the type of the content to be analysed
 */
function urls(content, itemsList, type) {
  /** Set config from CONFIG constant set with the type used */
  var config = CONFIG.urls;
  /** if the url type is an url (not a media), use urlPattern instead of imgPattern */
  var url = type === 'url' ? config.urlPattern : config.imgPattern;
  /** for each entity available, use it to replace in the pattern url
  with the specific tag __item__
  */
  itemsList.forEach(function(item) {
    /** for each entity available, check if it's an url or a media.
    then use the proper url patter (<a/> or <img/> tag) */
    var resourceURL = type === 'url' ? item.expanded_url : item.media_url_https;
    content = content
    /** ... then replace the text inside the the tweet content with the
    formated url and its html counterpart */
    .replace(item.url,
      /** first step : replace the __item__ with the correct value of the tag */
      url.replace(/__expandedurl__/gi, resourceURL)
    /** second step : replace the __displayurl__ tag with the real display URL */
    .replace(/__displayurl__/gi, item.display_url));
  });
  return content;
}
