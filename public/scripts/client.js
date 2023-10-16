$(document).ready(function() {


  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: 'GET',
    })
      .then(function(response) {
        renderTweets(response);
      })
      .catch(function(error) {
        console.log(error.message)
      })
  }
  loadTweets();
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const tweetValue = createTweetElement(tweet);
      $('#composeTweet').prepend(tweetValue);

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
    <div class="avatar2"><img src=${tweet.user.avatars} id="img1"> </i><p class="header-p" name="name1">${tweet.user.name}</p></div>
       <p class="header-p2">${tweet.user.handle}</p>
     </header><div class="p_format textareacss"><p name="text2" id="article-text">${escape(tweet.content.text)}</p></div>
     <div class="border"></div>
     <footer class="tweet-footer">
    <p class="footer-text" name="createdAt">${timeago.format(tweet.created_at, 'en_US')}</p>
    </p>
    <div class="div-icon">
      <i class="fa-solid fa-heart hovercss"></i>
      <i class="fa-solid fa-flag hovercss"></i>
      <i class="fa-solid fa-arrows-rotate hovercss"></i></footer></article>`)
    let $tweet = $(elements);
    return $tweet;
  }


  // Ajax post request on submit handler  
  $('#tweetForm').on('submit', function(event) {
    event.preventDefault();
    $('#error').hide();
    const textValue = this.text.value.trim();
    const lengthofText = textValue.length;
    if (lengthofText === 0) {
      $('#error').empty();
      $('#error').append(`<p>⚠️Please Enter a tweet</p>`)
      $('#error').show()
      return;
    }
    if (lengthofText > 140) {
      $('#error').empty();
      $('#error').append(`<p>⚠️Too Long .Max limit is 140 character<p>`)
      $('#error').show()
      return;
    }
    const data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: data
    })
      .then(function(data, status) {
        console.log('status: ' + status + ', data: ' + data);
        $('#tweet-text').val('');    // clear the form
        $('#counterValue').text('140');
        $('#composeTweet').empty();
        loadTweets();
      })

      .catch(error => {
        console.log('Error' + error.message);
      });

  });

  $('#tweet-text').on('input', function(event) {
    const lengthofText = this.value.length;
    if (lengthofText === 0) {
      $('#error').empty();
      $('#error').append(`<p>⚠️Please Enter a tweet</p>`)
      $('#error').show()
      return;
    }
    if (lengthofText > 0 && lengthofText <= 140) {
      $('#error').hide();
      return;
    }

  });

});

