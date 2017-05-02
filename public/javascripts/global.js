var NEWS_API_KEY = '942b09545cfe4e66bb3c67707b3629a0';
//setup API BASE URLS
var BASE_API_URL = 'https://newsapi.org/v1/';
var newsArticles = 'articles?source=';
var newsSourcesRequest = BASE_API_URL + 'sources';

//enumerate the news sources
$.get(newsSourcesRequest, function(newsSources) {
  $.each(newsSources, function(headers, sources ) {
    if(headers != 'status'){
      $.each(sources, function(source, data){
        $("news_blocks").append(
          '<div class="col-lg-4 hvr-sweep-to-top get-news" id="news_block" onclick="getSource(\'' + data.id + '\')">' +
            '<img id="news_favicon_gen" src=https://www.google.com/s2/favicons?domain=' + data.url + '></img>' +
             data.name +
          '</div>'
        );
      })
    }
  })
});

//get the latest news articles from the request
$('.get-news').click(getSource(source));

//get source function
function getSource(source) {
  var newsUrl = BASE_API_URL + newsArticles + source.toString() + '&apiKey=' + NEWS_API_KEY;
  $.ajax({
    type: 'GET',
    url: newsUrl,

    success: function(news){
      $.each(news, function(headers, articles ) {
        if(headers == 'articles'){
          $.each(articles, function(i, data){
            if(!data.urlToImage){
              data.urlToImage = "http://i.imgur.com/HLq0gU1.jpg";
            }
            if(!data.description){
              data.description = "No description available for this article.";
            }
            if(!data.author){
              data.author = "No author";
            }
            $("articles_blocks").prepend(
              '<div class="article_block">' +
                '<img class="images" href="' + data.url + '" src="' + data.urlToImage + '" width="250px" style="float:right"></img>' +
                '<a target="_blank" href="' + data.url + '" style="font-weight: bolder">' +
                   data.title  + "<span id='author' style='float:right;font-size:10px;font-weight:thin'>" + data.author + "</span>" +
                '</a>' +
                '<div class="article_description">' +
                  data.description +
                '</div>' +
              '</div>'
            )
          })
          $("articles_blocks").prepend('<hr><h4>' + news.source + '</h4><br>');
          //show article description
          $(function() {
            $('.article_block').click(function(){
              $('.article_description', this).toggle();
              $('.images', this).toggle();
              $('#author', this).toggle();
            });
          });
        };
      })
    },
    error: function(){
      alert('error news isn\'t available.');
    }
  })
};
