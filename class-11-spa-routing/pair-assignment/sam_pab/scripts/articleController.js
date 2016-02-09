(function(module) {
  var articlesController = {};

  articlesController.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS articles (' +
        'id INTEGER PRIMARY KEY, ' +
        'title VARCHAR(255) NOT NULL, ' +
        'author VARCHAR(255) NOT NULL, ' +
        'authorUrl VARCHAR (255), ' +
        'category VARCHAR(20), ' +
        'publishedOn DATETIME, ' +
        'body TEXT NOT NULL);',
      function(result) {
        console.log('Successfully set up the articles table.', result);
        if (callback) callback();
      }
    );
  };

  articlesController.loadAll = function(rows) {
    Article.all = rows.map(function(ele) {
      return new Article(ele);
    });
  };

  articlesController.fetchAll = function(next) {
    webDB.execute('SELECT * FROM articles ORDER BY publishedOn DESC', function(rows) {
      if (rows.length) {
        Article.loadAll(rows);
        next();
      } else {
        $.getJSON('/data/hackerIpsum.json', function(rawData) {
          // Cache the json, so we don't need to request it next time:
          rawData.forEach(function(item) {
            var article = new Article(item); // Instantiate an article based on item from JSON
            article.insertRecord(); // Cache the article in DB
          });
          webDB.execute('SELECT * FROM articles', function(rows) {
            Article.loadAll(rows);
            next();
          });
        });
      }
    });
  };

  articlesController.index = function() {
    $('main > section').hide();
    $('#articles').show();

  };

  module.articlesController = articlesController;
})(window);
