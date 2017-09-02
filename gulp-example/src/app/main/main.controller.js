(function() {
  'use strict';

  angular
    .module('explorer')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, $timeout, $interval, toastr, Github, $http) {
    var vm = this;

    vm.timestamp = moment();

    vm.showToastr = toastrFunction;

    function toastrFunction() {
      toastr['info']('Mensagem');
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
    // Github.query(function (result) {
    //   console.log(result);
    // });
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
