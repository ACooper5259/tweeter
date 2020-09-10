


function compose() {  
  const newTweet = document.getElementById("new-tweet");
  if (newTweet.style.display === "none") {
    newTweet.style.display = "block";
  } else {
    newTweet.style.display = "none";
  }
}

const writeButton = document.getElementsByClassName("write")
$(writeButton).click(compose)