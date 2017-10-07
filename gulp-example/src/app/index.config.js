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
    $httpProvider.defaults.headers.common['Authorization'] = 'token eb4382d46b8dc9bfff97b9e4cd685c2198822a6b';

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;
  }

})();
