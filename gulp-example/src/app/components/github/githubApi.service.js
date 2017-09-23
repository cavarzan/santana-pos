angular
  .module('explorer')
  .factory("Github", function($resource) {
    return $resource("https://api.github.com/search/repositories", {}, {
      query: {
        method: "GET",
        isArray: true
      }
    });
  })
  .factory("GithubUser", function($resource) {
    return $resource("https://api.github.com/users/:username/repos", {}, {
      query: {
        method: "GET",
        isArray: true,
        transformResponse: function(data, headers) {
          console.log(headers());
          console.log(headers()['Server']);
          return angular.fromJson(data);
        }
      }
    });
  });
