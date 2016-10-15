(function () {
  'use strict';
  angular
    .module('sportsFinder.common')
    .factory('formUtilsService', formUtilsService);

  formUtilsService.$inject = [];

  /* @ngInject */
  function formUtilsService() {
    return {
      getStatus: getStatus,
      reset: reset
    };

    //Implementation ---

    function getStatus(form, field) {
      if (form[field].$pristine) {
        return '';
      } else if (form[field].$valid) {
        return 'has-success';
      } else {
        return 'has-error';
      }
    }

    function reset(form) {
      form.$setPristine();
    }
  }
}());
