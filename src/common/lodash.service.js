(function () {
  'use strict';
  angular
    .module('sportsFinder.common')
    .factory('_', lodashService);

  lodashService.$inject = ['$window'];

  /* @ngInject */
  function lodashService($window) {
    return $window._;
  }
}());
