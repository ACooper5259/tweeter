$(document).ready(function () {

  const $tweet = $('#tweet-text');
  
  $tweet.keyup(function() {
    console.log ('tweet.change', this)
    const txtLength = $("#tweet-text").val().length;
    console.log(txtLength); 
    // const $counter = $('output.counter');
    $("output.counter").html(function () {
      return 140 - txtLength;
    });
  });

});