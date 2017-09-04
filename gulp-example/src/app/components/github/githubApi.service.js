

angular
  .module('explorer')
  .factory("Github", function($resource) {
  return $resource("https://api.github.com/search/users/:cep", {}, {
    query: {
      method: "GET",
      isArray: false
    }
  });
});
