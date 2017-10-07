angular
  .module('explorer')
  .directive("namePrinterTest", function() {
    return {
      restrict: 'EA',
      templateUrl : 'app/components/directives/example.html',
      scope : {
        eq : '=',
        at : '@',
        and : '&'
      },
      link : function (scope, element, attributes) {
          console.log(scope.eq);
          console.log(scope.$eval(scope.at));
          console.log(scope.and());
          scope.fieldText = "Meu campo"
          scope.$watch('fieldText', function (n, o) {
            if (n === 'BATMAN') {
              element.css({
                'color' : 'red'
              });
            }
          });
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
