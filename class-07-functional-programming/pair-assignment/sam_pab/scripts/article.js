(function(param){
  function Article (opts) {
    this.author = opts.author;
    this.authorUrl = opts.authorUrl;
    this.title = opts.title;
    this.category = opts.category;
    this.body = opts.body;
    this.publishedOn = opts.publishedOn;
  }
  Article.all = [];

  Article.prototype.toHtml = function() {
    var template = Handlebars.compile($('#article-template').text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);

    return template(this);
  };

  Article.loadAll = function(rawData) {
    rawData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });

    // DONE: Refactor this forEach code, by using a `.map` call instead, since want we are trying to accomplish
    // is the transformation of one colleciton into another.
    // rawData.forEach(function(ele) {
    //   Article.all.push(new Article(ele));
    // })
    Article.all = rawData.map(function(ele) {
      return new Article(ele);
    });
  };

  // This function will retrieve the data from either a local or remote source,
  // and process it, then hand off control to the View.
  Article.fetchAll = function(view) {
    // localStorage.clear();
    if (localStorage.rawData) {
      Article.loadAll(JSON.parse(localStorage.rawData));
      view();
    } else {
      $.getJSON('data/hackerIpsum.json', function(rawData) {
        Article.loadAll(rawData);
        localStorage.rawData = JSON.stringify(rawData); // Cache the json, so we don't need to request it next time.
        view();
      });
    }
  };


  Article.numWordsAll = function() {
    return Article.all.map(function(element) {
      // console.log(element.body.split(' '));
      return element.body.split(' ').length;
    })
    .reduce(function(a, b) {
      // console.log(a,b);
      return a + b;
    },0);
  };

  Article.allAuthors = function() {
    return Article.all.map(function(element){
      return element.author;
    })
    .reduce(function(list, author){
      if(list.indexOf(author) === -1){
        list.push(author);
      };
      return list;
    },[]);
    // Don't forget to read the docs on map and reduce!
  };

  Article.numWordsByAuthor = function() {
    return Article.allAuthors().map(function(author) {
      return {
        name: author,
        wordCount: Article.all.filter(function(ele) {
          if (ele.author === author) {
            return true;
          }
          return false;
        }).reduce(function(sum, article) {
          // console.log(sum)

          return sum + article.body.split(' ').length;
          // return ele.body.split(' ').length;

        }, 0)

      };
    });
  };
  param.Article = Article;
})(window);
