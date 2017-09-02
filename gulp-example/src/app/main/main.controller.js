(function() {
  'use strict';

  angular
    .module('explorer')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $interval, toastr, Github, $http) {
    var vm = this;

    vm.timestamp = moment();

    vm.showToastr = toastrFunction;

    function toastrFunction() {
      toastr['info']('Mensagem');
    }

    $interval(function () {
      vm.timestamp = moment();
    }, 1000);
    // Github.query(function (result) {
    //   console.log(result);
    // });
    vm.creationDate = moment();

    vm.awesomeThing = {
      title : 'Titulo',
      description : 'Descrição',
      url : 'https://www.google.com'

    }

    // $http.get("https://api.github.com/search/users?q=cavarzan")
    //           .success(function (data) {
    //               console.log(data);
    //           });




  }
})();
