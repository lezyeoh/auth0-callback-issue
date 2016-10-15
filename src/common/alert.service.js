(function () {
  'use strict';
  angular
    .module('sportsFinder.common')
    .factory('alertService', alertService);

  alertService.$inject = ['$rootScope', '$timeout'];

  /* @ngInject */
  function alertService($rootScope, $timeout) {
    var clearTimeout = void 0;
    return function (type, title, message, timeout) {
      $rootScope.alert = {
        isShown: true,
        show: true,
        title: title,
        message: message,
        type: type
      };
      $timeout.cancel(clearTimeout);
      clearTimeout = $timeout(function () {
        $rootScope.alert.show = false;
      }, timeout || 2500);
    };

  }
}());
