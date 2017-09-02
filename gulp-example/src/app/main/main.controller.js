(function() {
  'use strict';

  angular
    .module('explorer')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr) {
    var vm = this;

    vm.creationDate = moment();

    vm.showToastr = function() {
      toastr['info']('Mensagem');
    }

  }
})();
