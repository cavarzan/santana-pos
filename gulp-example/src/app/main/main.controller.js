(function() {
  'use strict';

  angular
    .module('explorer')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($state, $log, $timeout, $interval, toastr, Github, $http) {
    var vm = this;

    vm.navigateDetails = function(street, $index) {
        $log.info(street, $index);
        $state.go('details', {cep : street.cep});
    };

    vm.timestamp = moment();

    vm.showToastr = toastrFunction;

    function toastrFunction() {
      toastr['info']('Mensagem');
    }

    vm.query = function () {
      $http.get("http://viacep.com.br/ws/pr/ponta%20grossa/"
      + vm.search
      + "/json")
            .success(function (data) {
              $log.info(data);
              vm.repository = data;
      });
    }
    vm.user = {
        name : "Deividi Cavarzan",
        value : 20.00,
        carPlate : 'AOI9332',
        zipcode: '80620360',
        phone: '41999563272'
    };

    $interval(function () {
      vm.timestamp = moment();
    }, 1000);

    Github.query({q : 'esparta'}, function (result) {
      console.log(result);
    });

    vm.search =  "julia";
    vm.creationDate = moment();

    vm.numbers = [0,1,2,3,4,5];

    vm.awesomeThing = {
      title : 'Titulo',
      description : 'Descrição',
      url : 'https://www.google.com'
    }

    vm.repository = {};
    var query = "machado"
    $http.get("http://viacep.com.br/ws/pr/ponta%20grossa/" + query + "/json")
          .success(function (data) {
            $log.info(data);
            vm.repository = data;
    });



  }
})();
