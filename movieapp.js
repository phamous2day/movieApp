var page;

$(function() {
  $('#details-page').hide();

  $('#more-button').hide();
  $('#form').submit(function (event) {
    event.preventDefault();
    $('#results').html('');
    page = 1;
    search();
  });

  $('#more-button').click(function() {
    search();
  });

  $('#back-to-search-results').click(function(e) {
    e.preventDefault();
    $('#details-page').hide();
    $('#search-page').show();
  });

  $('#search-page').on('click', '.result', function(e) {
    e.preventDefault();
    var imdbID = $(this).data('data-imdbID');
    $.ajax({
      method: 'GET',
      url: 'http://www.omdbapi.com',
      data: {
        i: imdbID,
        plot: 'full'
      },
      success: function(data) {
        console.log(data);
        $('#search-page').hide();
        $('#details-page').show();

        $('#details-page .poster').attr('src', data.Poster);
        $('#details-page .title').text(data.Title);
        $('#details-page .actors').text(data.Actors);
        $('#details-page .plot').text(data.Plot);
        $('#details-page .awards').text(data.Awards);
        $('#details-page .year').text(data.Year);
        $('#details-page .director').text(data.Director);
        $('#details-page .rated').text(data.Rated);
        $('#details-page .language').text(data.Language);
        $('#details-page .genre').text(data.Genre);
        $('#details-page .runtime').text(data.Runtime);
        $('#details-page .imdb-rating').text(data.imdbRating);
        $('#details-page .imdb-votes').text(data.imdbVotes);
      }
    });
  });

});

function search() {
  var searchQuery = $('#search-field').val();
  $.ajax({
    method: 'GET',
    url: 'http://www.omdbapi.com/',
    data: {
      s: searchQuery,
      page: page
    },
    success: function(data) {
      var total = Number(data.totalResults);
      if (total > page * 10) {
        $('#more-button').show();
      } else {
        $('#more-button').hide();
      }
      var results = data.Search.map(function(result) {
        var div = $('<a>')
          .data('data-imdbID', result.imdbID)
          .attr('href', 'http://www.imdb.com/title/' + result.imdbID + '/')
          .addClass('result');
        if (result.Poster === 'N/A') {
          div.append('<span>' + result.Title + '</span>');
        } else {
          var img = $('<img>')
            .attr('src', result.Poster)
            .attr('alt', result.Title);
          div.append(img);
        }
        return div;
      });
      $('#results').append(results);
      page++;
    }
  });
}
