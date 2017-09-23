(function() {
  'use strict';

  angular
    .module('explorer')
    .controller('RaffleController', RaffleController);

  /** @ngInject */
  function RaffleController($scope, $sce, toastr) {

    var vm = this;

    vm.persons = [];
    vm.showExecuteButton = false;

    vm.remove = function(person, $index) {
      var item = vm.persons[$index];
      var $i = vm.persons.indexOf(person);
      vm.persons.splice($i, 1);
      // var size = vm.persons.length;
      // if (size <= 1) {
      //   vm.showExecuteButton = false;
      // }
    }

    vm.addName = function($form) {


      console.log($form);
      // var size = vm.persons.length;
      // if (size > 1) {
      //   vm.showExecuteButton = true;
      // }

      if (vm.person.name === undefined) return;

      var hasItem = false;
      angular.forEach(vm.persons, function($item, $index) {
        if ($item.name === vm.person.name) {
          hasItem = true;
        }
      });

      if (!hasItem) {
        vm.person.formattedName = $sce.trustAsHtml('<p style="color:white">'+vm.person.name+'</p>');
        vm.persons.push(angular.copy(vm.person));
        vm.person.name = undefined;
      } else {
        toastr['error']('Nome já adicionado');
      }

    };

    vm.executeRaffle = function() {
        
    };

    vm.person = {
      name: undefined
    };

    var nameWatcher = $scope.$watch('vm.person.name', function(n, o) {
      if (n === 'clear') {
        nameWatcher();
      }
    });

    // $scope.$watch('vm.person', function (n, o) {
    // }, true);

    $scope.$watchCollection('vm.persons', function(n, o) {
      // console.log(n, o);
      vm.showExecuteButton = n.length > 1 ? true : false;
    });


  }
})();
