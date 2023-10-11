/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
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

$(document).ready(function() {


  const renderTweets = function(tweets) {

    for (let tweet of tweets) {
      const tweetValue = createTweetElement(tweet);
      $('main').append(tweetValue);
    }
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }

  const createTweetElement = function(tweet) {
    //console.log("tweet value", tweet);
    const elements = $(`<article><header class="tweet-header">
    <div class="avatar2"><img src=${tweet.user.avatars} name="img1"></div> </i><p class="header-p" name="name1">${tweet.user.name}</p>
       <p class="header-p2">${tweet.user.handle}</p>
     </header><textarea name="text2" id="article-text" class="textareacss textarea2">${tweet.content.text}</textarea>
    <footer class="tweet-footer">
    <p class="footer-text" name="createdAt">${tweet.created_at}
    </p>
    <div class="div-icon">
      <i class="fa-solid fa-heart hovercss"></i>
      <i class="fa-solid fa-flag hovercss"></i>
      <i class="fa-solid fa-arrows-rotate hovercss"></i></footer>`)
    let $tweet = $(elements); /* Your code for creating the tweet element */

    return $tweet;
  }

  $('form').on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
   // console.log(data);    for debugging
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/tweets",
      data: data
    })
      .then(function(data, status, xhr) {
        console.log('status: ' + status + ', data: ' + data)
      })
      .catch(error => {
        console.log('Error' + error.message);
      });
  });

  renderTweets(data);

});

