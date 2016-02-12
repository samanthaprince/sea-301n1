(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    $.ajax({
      url: 'https://api.github.com/users/samanthaprince/repos?' + 'per_page=100' + 'sort=&updated',
      headers: {'Authorization': 'token ' + GITHUB_TOKEN },
      success: function(data,status){
        repos.all = data;
      }
    }).done(callback);

  };
      // console.log(JSON.parse(data));


  // DONE: Model method that filters the full collection for repos with a particular attribute.
  // You could use this to filter all repos that have a non-zero `forks_count`, `stargazers_count`, or `watchers_count`.
  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
repos.requestRepos();
