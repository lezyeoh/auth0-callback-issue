(function () {
  'use strict';
  angular
    .module('sportsFinder.auth')
    .directive('usernameAvailableValidator', usernameAvailableValidator);

  usernameAvailableValidator.$inject = ['authService'];

  /* @ngInject */
  function usernameAvailableValidator(authService) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        ngModel.$asyncValidators.usernameAvailable = checkUsername;

        //Implementation ---
        function checkUsername(email) {
          return authService.checkAvailability(email);
        }
      }
    };
  }
}());
