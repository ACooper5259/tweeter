/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(() => {
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const item_created = createTweetElement(tweet)
      $('#tweets-container').prepend(item_created)
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


  // POST request for new tweets 
  const $tweetForm = $('#new-tweet-form');
  $tweetForm.on('submit', function (event) {
    event.preventDefault();
    const serializedTweet = $(this).serialize();
    const textValue = $('#tweet-text').val()
    if (textValue.length === 0){
      alert( '❌ Please make sure you type a message')
    } else if (textValue.length > 140){
      alert('❌ You can not tweet more than 140 characters at a time!')
    } else {
      $.post('/tweets', serializedTweet)
      .then((response) => {
      loadTweets()
      $('#tweet-text').val(' ');
      })
    }
  });


  // GET request for tweets to /tweets
  const loadTweets = () => {
    $.get('/tweets', (tweets) => {
      renderTweets(tweets)
    })
  };
  loadTweets()

  });

  