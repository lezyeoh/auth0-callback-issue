(function () {
  'use strict';
  angular.module('sportsFinder.common')
    .filter('formatphone', function ($window) {
      return function phoneFormatter(input) {
        var country = $window.countryForE164Number(input);
        return $window.formatInternational(country, input);
      };
    });
}());
