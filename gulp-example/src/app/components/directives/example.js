angular
  .module('explorer')
  .directive("namePrinter", function() {
    return {
      restrict: 'EA',
      templateUrl : 'app/components/directives/example.html',
      scope : {
        eq : '=',
        at : '@',
        and : '&'
      },
      link : function (scope, element, attributes) {
          console.log(scope);
      },
      // controller: NamePrinterController,
      // controllerAs: 'vm',
      // bindToController: true
    }

    // function NamePrinterController($scope) {
    //   var vm = this;
    //   console.log($scope.eq)
    // }
  });
