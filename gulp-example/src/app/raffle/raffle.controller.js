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
        vm.persons.push(angular.copy(vm.person));
        vm.person.name = undefined;
      } else {
        toastr['error']('Nome já adicionado');
      }

      var json = angular.toJson(vm.persons);
      localStorage.setItem('persons', json);

    };

    vm.loadStorage = function () {
      var persons = localStorage.getItem('persons');
      vm.persons = angular.fromJson(persons);
    };

    function getNewMoment() {
      var defer = $q.defer();

      $timeout(function() {
        defer.resolve(moment().toDate());
      }, 5000);

      return defer.promise;
    }

    vm.deferred = moment().toDate();

    getNewMoment().then(function(result) {
      vm.deferred = result;
    });

    vm.executeRaffle = function() {
      vm.items = angular.copy(vm.persons);
      vm.initialItems = angular.copy(vm.items);
      vm.items = shuffle(vm.items);
      clearScreen()
        .then(process)
        .then(showResult);
    };

    function showResult() {
      vm.showSpinner = false;
      vm.hasResult = true;
      vm.result = vm.transientPerson;
    }

    function process() {
      var $items = vm.items;
      var defer = $q.defer();
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
            defer.resolve();
          } else {
            vm.transientPerson = $items[Math.floor(Math.random() * $items.length)];
          }
        }, time);
      }
      return defer.promise;
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
      }, 250, vm.persons.length);

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
