(function () {
  'use strict';
  angular
    .module('sportsFinder.welcome')
    .directive('bannerEnter', bannerEnterDirective);

  bannerEnterDirective.$inject = [];

  /* @ngInject */
  function bannerEnterDirective() {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        
          if(event.which === 13) {
            console.log(event.which);
            scope.$apply(function (){
              scope.$eval(attrs.bannerEnter);
            });
            event.preventDefault();
          }
      });
    };
  }
}());