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
    $httpProvider.defaults.headers.common['Authorization'] = 'token 961d26e9ac12c2cf0bb4951c2904052d92aa874d';

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;
  }

})();
