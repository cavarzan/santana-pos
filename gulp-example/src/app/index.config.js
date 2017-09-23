(function() {
  'use strict';

  angular
    .module('explorer')
    .config(config);

  /** @ngInject */
  function config($sceProvider, $logProvider, toastrConfig, $httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    $sceProvider.enabled(true);
    // $httpProvider.defaults.headers.common['Authorization'] = 'token 70a3865c1e2b8cb04fcd938248eb04a933e8867a';

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;
  }

})();
