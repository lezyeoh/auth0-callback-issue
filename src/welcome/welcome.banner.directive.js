(function () {
  'use strict';
  angular
    .module('sportsFinder.welcome')
    .directive('banner', bannerDirective);

  bannerDirective.$inject = [];

  /* @ngInject */
  function bannerDirective() {
    return {
      templateUrl: 'src/welcome/welcome.banner.tmpl.html',
      controller: 'BannerCtrl as vm'
    };
  }
}());