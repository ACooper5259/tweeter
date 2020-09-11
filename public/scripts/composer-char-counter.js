$(document).ready(function () {

  const $tweet = $('#tweet-text');
  $tweet.keyup(function() {
    const txtLength = $tweet.val().length;
    $("output.counter").html(function () {
      const charsLeft = 140 - txtLength;
      if (charsLeft < 0) {
        this.style.color = 'red';
      } else {
        this.style.color = '#545149';
      }
      return charsLeft;
    });
  });

});