(function () {
  'use strict';
  angular
    .module('sportsFinder.toolbar')
    .directive('toolbar', toolbarDirective);

  toolbarDirective.$inject = [];

  /* @ngInject */
  function toolbarDirective() {
    return {
      templateUrl: 'src/toolbar/toolbar.tmpl.html',
      controller: 'ToolbarCtrl as toolbar'
    };
  }
}());