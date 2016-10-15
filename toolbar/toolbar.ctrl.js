(function() {
  'use strict';
  angular
    .module('sportsFinder.toolbar')
    .controller('ToolbarCtrl', ToolbarCtrl);

  ToolbarCtrl.$inject = ['$rootScope', '$q', '$state', '$location', 'venuesService', 'sportsService', 'authService', 'alertService', '_'];

  /* @ngInject */
  function ToolbarCtrl($rootScope, $q, $state, $location, venuesService, sportsService, authService, alertService, _) {
    var vm = this;
    vm.logout = logout;
    vm.login = login;
    vm.isAdmin = authService.isAdmin();
    vm.profile = authService.getUserProfile();
    $rootScope.$on('userProfileSet', function(event, profile){
      vm.isAdmin = authService.isAdmin(profile);
    });
    
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      console.log(toState.name);
      if(toState.name=='schedule'){
        vm.scheduleState = true;
      }
      else{
        vm.scheduleState = false;
      }
    });
    
    function login() {
      authService.login();
    }

    function logout() {
      authService.logout();
    }

  }
}());
