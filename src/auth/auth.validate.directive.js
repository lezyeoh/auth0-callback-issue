(function () {
  'use strict';
  angular
    .module('sportsFinder.auth')
    .directive('validateEquals', validateEqualsDirective);

  validateEqualsDirective.$inject = [];

  /* @ngInject */
  function validateEqualsDirective() {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {

        ngModel.$parsers.push(validateEqual);
        ngModel.$formatters.push(validateEqual);

        scope.$watch(attrs.validateEquals, triggerValidation);

        //Implementation ---

        function triggerValidation() {
          ngModel.$setViewValue(ngModel.$viewValue);
        }

        function validateEqual(value) {
          var valid = (value === scope.$eval(attrs.validateEquals));
          ngModel.$setValidity('equal', valid);
          return valid ? value : void 0;
        }
      }
    };
  }
}());
