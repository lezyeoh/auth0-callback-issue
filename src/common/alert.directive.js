(function () {
  'use strict';
  angular
    .module('sportsFinder.common')
    .directive('alertmessage', alertDirective);

  alertDirective.$inject = [];

  /* @ngInject */
  function alertDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'src/common/alert.tmpl.html'
    };
  }
}());
