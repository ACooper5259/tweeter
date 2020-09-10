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

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML
  }

  const createTweetElement = function (tweet) {
    let $tweet = 
      $(`<article class="tweet">
          <header>
            <span class="author"><img src="${escape(tweet.user.avatars)}" alt="tweet author">
            ${escape(tweet.user.name)}</span>
            <span class="handle">${escape(tweet.user.handle)}</span>
          </header>
          <main>
            ${escape(tweet.content.text)}
          </main>
          <footer>
            <span>${moment(tweet.created_at).fromNow()}</span><span class="actions"><img src="/images/flag.png" alt="flag post"><img src="/images/re-tweet.png" alt="re-tweet"><img src="/images/heart.png"></span>
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
      $('.no-text-error').show()
    } else if (textValue.length > 140){
      $('.too-long-error').show()
    } else {
      $.post('/tweets', serializedTweet)
      .then((response) => {
      loadTweets()
      $('#tweet-text').val(' ');
        $('.no-text-error').hide()
        $('.too-long-error').hide()
        
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

  