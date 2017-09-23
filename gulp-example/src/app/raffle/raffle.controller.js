(function() {
  'use strict';

  angular
    .module('explorer')
    .controller('RaffleController', RaffleController);

  /** @ngInject */
  function RaffleController() {

    var vm = this;

    vm.persons = [];

    vm.remove = function (person, $index) {
      var item = vm.persons[$index];
      var $i = vm.persons.indexOf(person);
      vm.persons.splice($i, 1);
    }

    vm.addName = function() {
      vm.persons.push(angular.copy(vm.person));
    };

    vm.person = {
      name: undefined
    };




  }
})();
