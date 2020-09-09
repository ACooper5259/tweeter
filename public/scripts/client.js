/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweets = require("../../server/routes/tweets");

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
$(() => {
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const item_created = createTweetElement(tweet)
      $('#tweets-container').append(item_created)
    }
  }

  const createTweetElement = function (tweet) {
    let $tweet = 
      $(`<article class="tweet">
          <header>
            <span class="author"><img src="${tweet.user.avatars}" alt="tweet author">
            ${tweet.user.name}</span>
            <span class="handle">${tweet.user.handle}</span>
          </header>
          <main>
            ${tweet.content.text}
          </main>
          <footer>
            <span>${tweet.created_at} day ago</span><span class="actions"><img src="/images/flag.png" alt="flag post"><img src="/images/re-tweet.png" alt="re-tweet"><img src="/images/heart.png"></span>
          </footer>
      </article>`);
    
    return $tweet;
  }

  renderTweets(data);

  // POST request for new tweets 
  const $tweetForm = $('#new-tweet-form');
  $tweetForm.on('submit', function (event) {
    // prevent default behaviour
    event.preventDefault();
    // serialize data
    const serializedTweet = $(this).serialize();
    // submit data to POST route
    $.post('/tweets', serializedTweet)
    // console.log("request sent")
  });

  // GET request for tweets to /tweets
  const loadTweets = () => {
    $.get('/tweets', (tweets) => {
      renderTweets(tweets)
    })
  };
  loadTweets()

  });

  