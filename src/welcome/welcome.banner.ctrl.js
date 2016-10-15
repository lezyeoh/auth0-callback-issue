(function() {
  'use strict';
  angular
    .module('sportsFinder.welcome')
    .controller('BannerCtrl', BannerCtrl);

  BannerCtrl.$inject = ['$rootScope', '$q', '$state', '$location', 'venuesService', 'sportsService', 'authService', 'alertService', '_'];

  /* @ngInject */
  function BannerCtrl($rootScope, $q, $state, $location, venuesService, sportsService, authService, alertService, _) {
    var vm = this;
    vm.searchSubmit = searchSubmit;
    function searchSubmit(){
      var term = vm.searchterm;
      if(term){
        $state.go('search', {"id":term});
      }
    }
  }
}());
