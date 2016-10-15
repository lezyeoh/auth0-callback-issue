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
      getVenues();
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

    getSports();
    getVenues();
    function login() {
      authService.login();
    }

    function logout() {
      authService.logout();
    }

    function getVenues() {
      var profile = authService.getUserProfile();
      if (profile) {
        if (profile.email) {
          var data = {
            email: profile.email
          };
          venuesService.getVenuesByUser(data).success(function(results) {
            if (results) {
              vm.userVenues = results;
            }
          });
        }
      }
    }

    function getSports() {
      sportsService.viewAll().success(function(results) {
        if (results) {
          vm.sports = _.sortBy(results, function(o) {
            return o.name;
          });
        }
      });
    }
  }
}());
