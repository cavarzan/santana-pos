(function() {
  'use strict';

  angular
    .module('explorer')
    .config(routerConfig)
    .controller('GithubController', GithubController);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('github', {
        url: '/github',
        templateUrl: 'app/github/github.html',
        controller: 'GithubController',
        controllerAs: 'vm'
      });
  }

  /** @ngInject */
  function GithubController(GithubUserRepository, GithubUserSearch, $localStorage, $scope, $state, $log, $timeout, $interval, toastr, Github, GithubUser, $http, leafletData) {
    var vm = this;

    vm.page = 2;

    vm.eq = {
      name: 'equals!'
    };
    console.log('ok')
    $http.get('https://api.github.com/search/users?q=teste').then(function (result) {
      console.log(result);
    });
    vm.at = {
      name: 'at!'
    };

    vm.and = function() {
      console.log('teste');
    };

    vm.queryRepositories = function() {
      Github.get({
        q: vm.repositorySearchTerm
      }, function(result) {
        console.log(result);
      });
    };

    vm.queryUserRepos = function() {
      GithubUser.query({
        username: vm.userSearchTerm
      }, function(result) {
        console.log(result);
      });
    };

    vm.queryUserRepository = function() {
      GithubUserRepository.get({
        username: vm.userSearchTerm,
        repo: vm.repositorySearchTerm
      }, function(result) {
        console.log(result);
      });
    };

    vm.queryUser = function() {
      GithubUserSearch.get({
        q: vm.userSearchTerm
      }, function(result) {
        console.log(result);
      });
    };

  }
})();
