(function () {
  'use strict';
  angular
    .module('sportsFinder.home')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['venuesService', 'authService'];

  /* @ngInject */
  function HomeCtrl(venuesService, authService) {
    var vm = this;
    vm.profile = authService.getUserProfile();
    
  }
}());
