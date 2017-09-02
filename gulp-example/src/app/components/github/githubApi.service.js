

angular
  .module('explorer')
  .factory("Github", function($resource) {
  return $resource("https://api.github.com/search/users?q=cavarzan/:id", {}, {
    query: {
      method: "GET",
      isArray: false
    }
  });
});
