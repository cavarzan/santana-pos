(function() {
  'use strict';

  angular
    .module('explorer')
    .controller('DetailsController', DetailsController);

  /** @ngInject */
  function DetailsController(toastr, $log, $stateParams, $http) {
    var vm = this;

    $http
      .get("http://viacep.com.br/ws/"+$stateParams.cep+"/json")
      .success(function (result) {
          vm.detail = result;
          $log.info(result);
      })
      .error(function (e) {
        $log.error(result);
        toastr['error'](result);
      });

  }
})();
