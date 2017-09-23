(function() {
  'use strict';

  angular
    .module('explorer')
    .controller('RaffleController', RaffleController);

  /** @ngInject */
  function RaffleController($q, $interval, $timeout, $scope, $sce, toastr) {

    var vm = this;

    vm.persons = [];
    vm.showExecuteButton = false;

    vm.remove = function(person, $index) {
      var item = vm.persons[$index];
      var $i = vm.persons.indexOf(person);
      vm.persons.splice($i, 1);
    }

    vm.addName = function($form) {
      if (vm.person.name === undefined) return;

      var hasItem = false;
      angular.forEach(vm.persons, function($item, $index) {
        if ($item.name === vm.person.name) {
          hasItem = true;
        }
      });

      if (!hasItem) {
        vm.person.formattedName = $sce.trustAsHtml('<p style="color:white">' + vm.person.name + '</p>');
        vm.persons.push(angular.copy(vm.person));
        vm.person.name = undefined;
      } else {
        toastr['error']('Nome já adicionado');
      }

    };

    vm.executeRaffle = function() {
      vm.items = angular.copy(vm.persons);
      vm.initialItems = angular.copy(vm.items);
      clearScreen().then(function() {
        vm.items = shuffle(vm.items);
        process(vm.items);
      });
    };

    function process($items) {
      var index = 0;
      var time = 100;
      var iterations = 37 + Math.ceil((15 * Math.random()));
      vm.transientPerson = {};
      vm.showSpinner = true;
      vm.hasResult = false;
      for (var i = 0; i < iterations; i++) {
        time = (time) * 1.1;
        $timeout(function() {
          index++;
          if (index === iterations) {
            vm.showSpinner = false;
            vm.hasResult = true;
            vm.result = vm.transientPerson;
          } else {
            vm.transientPerson = $items[Math.floor(Math.random() * $items.length)];
          }
        }, time);
      }
    }

    function clearScreen() {
      var defer = $q.defer();
      var i = 0;
      $interval(function() {
        vm.persons.pop();
        i++;
        if (i === vm.items.length) {
          $timeout(function() {
            defer.resolve();
          }, 500);

        }
      }, 100, vm.persons.length);

      return defer.promise;
    }

    function shuffle(o) {
      for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    };

    vm.person = {
      name: undefined
    };

    var nameWatcher = $scope.$watch('vm.person.name', function(n, o) {
      if (n === 'clear') {
        nameWatcher(); // cancel watcher
      }
    });

    // $scope.$watch('vm.person', function (n, o) {
        // watch for object
    // }, true);

    $scope.$watchCollection('vm.persons', function(n, o) {
      vm.showExecuteButton = n.length > 1 ? true : false;
    });

    vm.repeat = function() {
      vm.transientPerson = {};
      vm.showSpinner = false;
      vm.hasResult = false;
      vm.person = {};
      vm.persons = [];

      var i = 0;
      $interval(function() {
        vm.persons.push(vm.initialItems[i++]);
      }, 100, vm.initialItems.length);

    };


  }
})();
