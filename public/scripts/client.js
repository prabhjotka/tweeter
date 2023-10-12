/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('form').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: 'GET',
    })
      .then(function(response) {
        renderTweets(response);
      })
      .catch(function(error) {
        console.log(error.message)
      });

  })
  //  Function to render tweet
  const renderTweets = function(tweets) {

    for (let tweet of tweets) {
      const tweetValue = createTweetElement(tweet);
      $('main').append(tweetValue);
    }
  }

  //  Function for prevent cross side scripting

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //  Function to create tweetElements.

  const createTweetElement = function(tweet) {
    const elements = $(`<article><header class="tweet-header">
    <div class="avatar2"><img src=${tweet.user.avatars} name="img1"></div> </i><p class="header-p" name="name1">${tweet.user.name}</p>
       <p class="header-p2">${tweet.user.handle}</p>
     </header><textarea name="text2" id="article-text" class="textareacss textarea2">${escape(tweet.content.text)}</textarea>
    <footer class="tweet-footer">
    <p class="footer-text" name="createdAt">${timeago.format(tweet.created_at, 'en_US')}</p>
    </p>
    <div class="div-icon">
      <i class="fa-solid fa-heart hovercss"></i>
      <i class="fa-solid fa-flag hovercss"></i>
      <i class="fa-solid fa-arrows-rotate hovercss"></i></footer>`)
    //const testElement=$(`<div>${escape(tweet.content.text)}</div>`);      Note:// Test the escape function with mentor on line 51,52
    //let $tweet = $(testElement);       
    let $tweet = $(elements);
    return $tweet;
  }

  //event handler on textarea

  $('#tweet-text').on('keyup', function(event) {
    const lengthofText = this.value.length;
    if (lengthofText > 0 && lengthofText <= 140) {
      $('#error').hide();
      return;
    }

  });

  //jquery Event handler on submit
  $('form').on('submit', function(event) {
    event.preventDefault();
    $('#error').hide();
    const lengthofText = this.text.value.length;

    if (lengthofText === 0) {
      $('#error').empty();
      $('#error').append(`<p>⚠️Please Enter a tweet</p>`)
      $('#error').show()
      return;
    }
    if (lengthofText > 140) {
      $('#error').empty();
      $('#error').append(`<p>⚠️Too Long .Max limit is 140 charcter<p>`)
      $('#error').show()
      // $("#error").slideUp();
      return;
    }
    const data = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "http://localhost:8080/tweets",
      data: data
    })
      .then(function(data, status) {
        console.log('status: ' + status + ', data: ' + data)
        // clear the form
        $('#tweet-text').val(' ');
      })
      .catch(error => {
        console.log('Error' + error.message);
      });

  });

});

