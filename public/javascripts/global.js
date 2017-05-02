var NEWS_API_KEY = '942b09545cfe4e66bb3c67707b3629a0';
var newsApiUrl = 'https://newsapi.org/v1/';
var newsSourcesRequest = newsApiUrl + 'sources';

$.get(newsSourcesRequest, function(newsSources) {
  $.each(newsSources, function(headers, sources ) {
    if(headers != 'status'){
      $.each(sources, function(source, data){
        $("news_blocks").append(
          '<div class="col-lg-4 hvr-sweep-to-top" id="news_block">' +
            '<img id="news_favicon_gen" src=https://www.google.com/s2/favicons?domain=' + data.url + '></img>' +
             data.name +
          '</div>'
        );
      })
    }
  })
});
